import React, { useState } from 'react';
import '../App.css'; // Ensure your CSS styles are updated for dropdowns

function ChainTokenSelector({ onChange }) {
  const [selectedSourceChain, setSelectedSourceChain] = useState('');
  const [selectedSourceToken, setSelectedSourceToken] = useState('');
  const [selectedDestinationChain, setSelectedDestinationChain] = useState('');
  const [selectedDestinationToken, setSelectedDestinationToken] = useState('');

  const handleSourceChainChange = (event) => {
    const chain = event.target.value;
    setSelectedSourceChain(chain);
    onChange(chain, selectedSourceToken, true);
  };

  const handleSourceTokenChange = (event) => {
    const token = event.target.value;
    setSelectedSourceToken(token);
    onChange(selectedSourceChain, token, true);
  };

  const handleDestinationChainChange = (event) => {
    const chain = event.target.value;
    setSelectedDestinationChain(chain);
    onChange(chain, selectedDestinationToken, false);
  };

  const handleDestinationTokenChange = (event) => {
    const token = event.target.value;
    setSelectedDestinationToken(token);
    onChange(selectedDestinationChain, token, false);
  };

  return (
    <div className="chain-token-selector">
      <div className="selection-block">
        <h3>Source</h3>
        <div className="chain-token-pair">
          <select value={selectedSourceChain} onChange={handleSourceChainChange}>
            <option value="">Select Source Chain</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Binance">Binance</option>
            {/* Add more options as necessary */}
          </select>
          <select value={selectedSourceToken} onChange={handleSourceTokenChange}>
            <option value="">Select Source Token</option>
            <option value="ETH">ETH</option>
            <option value="BNB">BNB</option>
            {/* Add more options as necessary */}
          </select>
        </div>
      </div>
      <div className="selection-block">
        <h3>Destination</h3>
        <div className="chain-token-pair">
          <select value={selectedDestinationChain} onChange={handleDestinationChainChange}>
            <option value="">Select Destination Chain</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Binance">Binance</option>
            {/* Add more options as necessary */}
          </select>
          <select value={selectedDestinationToken} onChange={handleDestinationTokenChange}>
            <option value="">Select Destination Token</option>
            <option value="ETH">ETH</option>
            <option value="BNB">BNB</option>
            {/* Add more options as necessary */}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ChainTokenSelector;
