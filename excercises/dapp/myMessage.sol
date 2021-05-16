// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Message {
    string myMessage;

    function setMessage(string memory x) public returns (string memory) {
        myMessage = x;
        return myMessage;
    }

    function getMessage() public view returns (string memory) {
        return myMessage;
    }
}
