App = {
  web3Provider: null,
  contracts: {},

  init: async () => {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async () => {
      // Connect a the web3 provider
      if (ethereum) {
        console.log('Using metamask')
        App.web3Provider = ethereum
        web3 = new Web3(ethereum)
      } else {
        console.log('Not using metamask')
        const url = 'http://localhost:7545'
        App.web3Provider = new Web3.providers.HttpProvider(url)
        web3 = new Web3(App.web3Provider)
      }

    return App.initContract();
  },

  initContract: () => {
    $.getJSON('Adoption.json', (data) => {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      const AdoptionArtifact = data
      App.contracts.Adoption = TruffleContract(AdoptionArtifact)

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider)

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted()
    })

    return App.bindEvents();
  },

  bindEvents: () => {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: () => {
    var adoptionInstance

    App.contracts.Adoption.deployed()
      .then((instance) => {
        adoptionInstance = instance
        
        return adoptionInstance.getAdopters.call()
      })
      .then((adopters) => {
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] !== '0x0000000000000000000000000000000000000000')
            $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true)
        }
      })
      .catch((error) => console.log(error.message))
  },

  handleAdopt: function(event) {
    event.preventDefault()

    const petId = parseInt($(event.target).data('id'))

    var adoptionInstance

    web3.eth.getAccounts((error, accounts) => {
      if (error)
        console.log(error)

      const account = accounts[0]

      App.contracts.Adoption.deployed()
        .then((instance) => {
          adoptionInstance = instance

          // Execute adopt as a transaction by sending account
          return adoptionInstance.adopt(petId, {from: account})
        })
        .then((result) => App.markAdopted())
        .catch((error) => console.log(error.message))
    })
  }
}

$(() => {
  $(window).load(() => App.init())
})
