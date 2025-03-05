import express from 'express';
import { web3, ipfs } from '../index.js';

const router = express.Router();

// Create new DID
router.post('/', async (req, res) => {
  try {
    const { document } = req.body;
    const userAddress = web3.eth.accounts.create();
    
    // Store DID document on IPFS
    const result = await ipfs.add(JSON.stringify(document));
    const ipfsHash = result.path;

    // Create DID identifier
    const did = `did:eth:${userAddress.address}`;

    res.json({
      did,
      address: userAddress.address,
      privateKey: userAddress.privateKey,
      documentHash: ipfsHash
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating DID' });
  }
});

// Resolve DID document
router.get('/:did', async (req, res) => {
  try {
    const { did } = req.params;
    
    // In a real implementation, you would:
    // 1. Query the smart contract for the IPFS hash
    // 2. Retrieve the document from IPFS
    // 3. Verify the document's integrity
    
    const mockDocument = {
      id: did,
      controller: did,
      created: new Date().toISOString(),
      authentication: [`${did}#keys-1`]
    };

    res.json(mockDocument);
  } catch (error) {
    res.status(500).json({ message: 'Error resolving DID' });
  }
});

// Update DID document
router.put('/:did', async (req, res) => {
  try {
    const { did } = req.params;
    const { document } = req.body;

    // Store updated document on IPFS
    const result = await ipfs.add(JSON.stringify(document));
    const ipfsHash = result.path;

    res.json({
      did,
      documentHash: ipfsHash,
      updated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating DID' });
  }
});

export const didRoutes = router;