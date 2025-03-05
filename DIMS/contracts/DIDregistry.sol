// contracts/DIDRegistry.sol
pragma solidity ^0.8.0;

contract DIDRegistry {
    struct DID {
        address owner;
        string document;
        uint256 updated;
    }
    
    mapping(string => DID) private dids;
    
    event DIDCreated(string indexed did, address owner);
    event DIDUpdated(string indexed did, string document);
    
    function createDID(string memory did, string memory document) public {
        require(dids[did].owner == address(0), "DID already exists");
        dids[did] = DID(msg.sender, document, block.timestamp);
        emit DIDCreated(did, msg.sender);
    }
    
    function updateDID(string memory did, string memory document) public {
        require(dids[did].owner == msg.sender, "Not authorized");
        dids[did].document = document;
        dids[did].updated = block.timestamp;
        emit DIDUpdated(did, document);
    }
}
