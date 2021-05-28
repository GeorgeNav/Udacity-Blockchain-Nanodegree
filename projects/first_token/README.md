# Details
- Contract address on rinkeby network: 0x58Dfc3FD0e4d25EF87bAd7C160b69b0136E762cE

# Setup for this project
- `npm install;`
- modify `./node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol` file to make `_totalSupply` accessible in main contract file when inheriting
  ```javascript
  uint256 public _totalSupply;
  ```
  to
  ```javascript
  uint256 internal _totalSupply;
  ```
  and
  ```javascript
  pragma solidity ^0.8.0;
  ```
- Compile: `truffle compile`
- Migrate (local node): `truffle migrate --reset`
- Migrate (rinkeby network): `truffle migrate --reset --network rinkeby`

# Starting from scratch instructions
- create directory
  ```sh
  mkdir first_token;
  ```
- init proejct using truffle
  ```sh
  truffle init;
  ```
- package for ERC-20 token
  ```sh
  npm install @truffle/hdwallet-provider;
  npm install openzeppelin-solidity;
  ```