import React, { useState } from 'react';
import Modal from 'react-modal';
import Confetti from 'react-confetti';
import '../App.css';
import EthPrice from './EthPrice';

Modal.setAppElement('#root'); // Bind modal to your app root element for accessibility

function SwapInterface({ sourceChain, sourceToken, destinationChain, destinationToken }) {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSwap = (swapInfoJson) => {
    console.log('Swap Information:', swapInfoJson);

    // Save the JSON data or pass it where you need it here
    const existingSwaps = JSON.parse(localStorage.getItem('swaps')) || [];
    existingSwaps.push(JSON.parse(swapInfoJson));
    localStorage.setItem('swaps', JSON.stringify(existingSwaps));

    // Reset the parameters
    setAmount(0);
    setRecipient('');

    // Show the modal with confetti
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="swap-interface">
      <h2>Swap Interface</h2>
      <div className="swap-section">
        <div className="swap-block">
          <h3>Send</h3>
          <div>{sourceChain} - {sourceToken}</div>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Amount" 
            className="input-field"
          />
        </div>
        <div className="swap-block">
          <h3>Receive</h3>
          <div>{destinationChain} - {destinationToken}</div>
          <EthPrice 
            sourceToken={sourceToken} 
            destinationToken={destinationToken} 
            amount={amount} 
          />
        </div>
      </div>
      <div className="recipient-section">
        <h3>Recipient</h3>
        <input 
          type="text" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)} 
          placeholder="Recipient Address" 
          className="input-field"
        />
        <button 
          className="submit-btn" 
          onClick={() => handleSwap(JSON.stringify({ sourceChain, sourceToken, destinationChain, destinationToken, amount, recipient }, null, 2))}
        >
          Submit
        </button>
      </div>

      {/* Modal for showing "Intent Submitted!" with confetti */}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <Confetti />
        <div className="modal-content">
          <h2>Intent Submitted!</h2>
          <button onClick={closeModal} className="modal-close-btn">Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default SwapInterface;
