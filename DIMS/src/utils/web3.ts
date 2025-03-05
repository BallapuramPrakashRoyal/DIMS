import Web3 from 'web3';
import DIDRegistryABI from '../contracts/DIDRegistry.json';

const web3 = new Web3(window.ethereum || 'http://localhost:8545');

export const getDIDRegistryContract = (address: string) => {
  return new web3.eth.Contract(DIDRegistryABI.abi, address);
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error('User denied account access');
      throw error;
    }
  } else {
    throw new Error('Please install MetaMask');
  }
};

export { web3 };