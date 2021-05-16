const Web3 = require('web3')
const { Transaction } = require('ethereumjs-tx')

const ganacheURL = 'http://127.0.0.1:7545'
const web3 = new Web3(ganacheURL)

const getEOCAccountInfo = async (EOS, text) => {
    EOS.balance = await web3.eth.getBalance(EOS.address)
    EOS.nonce = await web3.eth.getTransactionCount(EOS.address)
    console.log(text, EOS)
}

web3.eth.getAccounts()
  .then(async (accounts) => {
    const sender = {
      address: accounts[0],
      privateKey: new Buffer.from('9954763fcb5b3ee983680c90985cac4dcb8f71ceef36ae8410eba8bb72f4ebd2', 'hex'),
    }
    const receiver = {
      address: accounts[1],
      privateKey: new Buffer.from('c4469ae781f6836ef3de6ba9a9642964e3c04afb4af110ef72e7a073bcb680e8', 'hex'),
    }

    console.log('BEFORE')
    await getEOCAccountInfo(sender, 'sender (before)')
    await getEOCAccountInfo(receiver, 'receiver (before)')

    const rawTransaction = {
      nonce: sender.nonce, // TODO: this must be incremented after every transaction
      to: receiver.address,
      gasPrice: 20000000,
      gasLimit: 30000,
      value: 100, // NOTE: in wei
      data: "0x", // NOTE: left blank since it's to a EOA (would have something if sent to CA)
    }

    const transaction = new Transaction(rawTransaction)
    transaction.sign(sender.privateKey)
    const serializedTransaction = transaction.serialize()
    await web3.eth.sendSignedTransaction(serializedTransaction)

    oldSenderBalance = sender.balance
    await getEOCAccountInfo(sender, 'sender (after)')
    await getEOCAccountInfo(receiver, 'receiver (after)')
    console.log('old sender balance', oldSenderBalance)
    console.log('new sender balance + gas limit = ', sender.balance + rawTransaction.gasLimit)

    console.log('Network Information')
    console.log('Gas Price: ', await web3.eth.getGasPrice())
    console.log('Uncle: ', await web3.eth.getUncle(10, 0))
    console.log('Block Transaction Count: ', await web3.eth.getBlockTransactionCount(10))
  })
  .catch(console.log)