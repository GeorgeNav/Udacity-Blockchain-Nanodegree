const Web3 = require('web3')
const infraURL = 'https://rinkeby.infura.io/v3/05b788c025324148a75ee3eada008e46'
const web3 = new Web3(infraURL)

const EOC = { // NOTE: from rinkeby test network
  address: '0x846efF907468574f754435354722Fd874Af7dED0',
}

EOC.balance = new Promise((resolve, reject) =>
  web3.eth.getBalance(EOC.address, (error, balance) => {
    if(error)
      resolve(-1)
    else {
      console.log('wei: ', balance)
      console.log('ether: ', web3.utils.fromWei(balance, 'ether'))
      resolve(balance)
    }
  }))

EOC.tx_count = new Promise((resolve, reject) =>
  web3.eth.getTransactionCount(EOC.address, (error, tx_count) => {
    if(error)
      resolve(-1)
    else {
      console.log('num transactions: ', tx_count)
      resolve(tx_count)
    }
  }))

CA = { // NOTE: from rinkeby test network
  abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}],
  address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
}

const contract = new web3.eth.Contract(CA.abi, CA.address)

const contractMethodCall = async (call) => await new Promise((resolve, reject) =>
    call((error, result) => error ? resolve(null) : resolve(result)))


const getContractData = async () => {
  const symbol = await contractMethodCall(contract.methods.symbol().call)
  const name = await contractMethodCall(contract.methods.name().call)
  const totalSupply = await contractMethodCall(contract.methods.totalSupply().call)

  console.log(symbol)
  console.log(name)
  console.log(totalSupply)
}

getContractData()
