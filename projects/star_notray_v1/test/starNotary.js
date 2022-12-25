require('babel-polyfill')

const StarNotary = artifacts.require('./StarNotary.sol') // import ABI

let instance
let accounts
var owner

contract('StarNotary', async (curAccounts) => {
  accounts = curAccounts
  owner = accounts[0]
  instance = await StarNotary.deployed()
})

it('has correct name', async () => {
  const starName = await instance.starName.call()
  assert.equal(starName, 'Awesome Udacity Star')
})