import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import '../App.css'; // Optional: Add a separate CSS file for custom styles

function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new Web3Provider(window.ethereum);  // Corrected this line
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to use this feature.");
    }
  };

  return (
    <button className="connect-wallet-btn" onClick={connectWallet}>
      {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
    </button>
  );
}

export default ConnectWallet;
