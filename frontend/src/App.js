import React, { useState } from 'react';
import './App.css';
import ChainTokenSelector from './components/ChainTokenSelector';
import SwapInterface from './components/SwapInterface';
import OrderList from './components/OrderList';
import ConnectWallet from './components/ConnectWallet';

function App() {
  const [sourceChain, setSourceChain] = useState('');
  const [sourceToken, setSourceToken] = useState('');
  const [destinationChain, setDestinationChain] = useState('');
  const [destinationToken, setDestinationToken] = useState('');
  const [amount, setAmount] = useState('');

  const handleChainTokenChange = (chain, token, isSource) => {
    if (isSource) {
      setSourceChain(chain);
      setSourceToken(token);
    } else {
      setDestinationChain(chain);
      setDestinationToken(token);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="app">
      <header className="page-header">
        <div className="logo">
          {/* <img src="https://via.placeholder.com/150" alt="Placeholder Logo" /> */}
        </div>
        {/* <h1>Chain Intents</h1> */}
        <ConnectWallet /> {/* Add the ConnectWallet button here */}
      </header>

      <div className="main-content">
        <div className="left-container">
          <ChainTokenSelector onChange={handleChainTokenChange} />
          {/* Conditionally render SwapInterface */}
          {sourceChain && sourceToken && destinationChain && destinationToken && (
            <SwapInterface
              sourceChain={sourceChain}
              sourceToken={sourceToken}
              destinationChain={destinationChain}
              destinationToken={destinationToken}
              amount={amount}
              onAmountChange={handleAmountChange}
            />
          )}
        </div>
        <div className="right-container">
          <OrderList />
        </div>
      </div>
    </div>
  );
}

export default App;
