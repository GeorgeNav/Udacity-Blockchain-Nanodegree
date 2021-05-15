const Web3 = require('web3')
const { Transaction } = require('ethereumjs-tx')

const ganacheURL = 'http://127.0.0.1:7545'
const web3 = new Web3(ganacheURL)

web3.eth.getAccounts()
  .then(async (accounts) => {
    const sender = {address: accounts[0]}
    const receiver = {address: accounts[1]}

    await web3.eth.getBalance(sender.address).then((balance) => {
      console.log(`${sender.address}: ${balance}`)
      sender.balance = balance
    })

    web3.eth.getBalance(receiver.address).then((balance) => {
      console.log(`${receiver.address}: ${balance}`)
      receiver.balance = balance
    })

    const rawTransaction = {
      nonce: 0, // TODO: this must be incremented after every transaction
      to: receiver.address,
      gasPrice: 20000000,
      gasLimit: 30000,
      value: 100, // NOTE: in wei
      data: "0x", // NOTE: left blank since it's to a EOA (would have something if sent to CA)
    }

    sender.privateKey = new Buffer.from('9954763fcb5b3ee983680c90985cac4dcb8f71ceef36ae8410eba8bb72f4ebd2', 'hex')
    const transaction = new Transaction(rawTransaction)
    transaction.sign(sender.privateKey)
    const serializedTransaction = transaction.serialize()
    web3.eth.sendSignedTransaction(serializedTransaction)
  })
  .catch(console.log)