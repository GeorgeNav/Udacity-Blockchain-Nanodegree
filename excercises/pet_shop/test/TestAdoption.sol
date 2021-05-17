pragma solidity >=0.4.20;

import "truffle/Assert.sol"; // Gives us various assertions to use in our tests. In testing, an assertion checks for things like equality, inequality or emptiness to return a pass/fail from our test
import "truffle/DeployedAddresses.sol"; // address of fresh (newly) deployed contract
import "../contracts/Adoption.sol";

contract TestAdoption {
    // The address of the adoption contract to be tested
    Adoption adoption = Adoption(DeployedAddresses.Adoption());

    // The id of the pet that will be used for testing
    uint256 expectedPetId = 8;

    //The expected owner of adopted pet is this contract
    address expectedAdopter = address(this);

    // Testing retrieval of a single pet's owner
    function testUserCanAdoptPet() public {
        uint256 returnedPetId = adoption.adopt(expectedPetId);

        Assert.equal(
            returnedPetId,
            expectedPetId,
            "Adoption of the expected pet should match what is returned"
        );
    }

    // Testing retrieval of all pet owners
    function testGetAdopterAddressByPetIdInArray() public {
        // Store adopters in memory rather than contract's storage
        address[16] memory adopters = adoption.getAdopters();

        Assert.equal(
            adopters[expectedPetId],
            expectedAdopter,
            "Owner of the expected pet should be this contract"
        );
    }
}
