import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EthPrice = ({ sourceToken, destinationToken, amount }) => {
  const [ethPriceUSD, setEthPriceUSD] = useState(null);
  const [bnbPriceUSD, setBnbPriceUSD] = useState(null);
  const [amountToReceive, setAmountToReceive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin&vs_currencies=usd'
        );

        const ethPrice = response.data.ethereum.usd;
        const bnbPrice = response.data.binancecoin.usd;

        setEthPriceUSD(ethPrice);
        setBnbPriceUSD(bnbPrice);
        setLoading(false);
      } catch (err) {
        setError('Error fetching prices');
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    if (ethPriceUSD && bnbPriceUSD && amount && sourceToken && destinationToken) {
      calculateAmountToReceive();
    }
  }, [ethPriceUSD, bnbPriceUSD, amount, sourceToken, destinationToken]);

  const calculateAmountToReceive = () => {
    let amountReceived;

    if (sourceToken.toLowerCase() === 'usd' && destinationToken.toLowerCase() === 'eth') {
      amountReceived = amount / ethPriceUSD;
    } else if (sourceToken.toLowerCase() === 'usd' && destinationToken.toLowerCase() === 'bnb') {
      amountReceived = amount / bnbPriceUSD;
    } else if (sourceToken.toLowerCase() === 'eth' && destinationToken.toLowerCase() === 'usd') {
      amountReceived = amount * ethPriceUSD;
    } else if (sourceToken.toLowerCase() === 'bnb' && destinationToken.toLowerCase() === 'usd') {
      amountReceived = amount * bnbPriceUSD;
    } else if (sourceToken.toLowerCase() === 'eth' && destinationToken.toLowerCase() === 'bnb') {
      amountReceived = (amount * ethPriceUSD) / bnbPriceUSD;
    } else if (sourceToken.toLowerCase() === 'bnb' && destinationToken.toLowerCase() === 'eth') {
      amountReceived = (amount * bnbPriceUSD) / ethPriceUSD;
    } else {
      amountReceived = 0;
    }

    setAmountToReceive(amountReceived);
  };

  const shouldShowEthPrice =
    sourceToken.toLowerCase() === 'eth' || destinationToken.toLowerCase() === 'eth';

  const shouldShowBnbPrice =
    sourceToken.toLowerCase() === 'bnb' || destinationToken.toLowerCase() === 'bnb';

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="eth-price-container">
      <h2 className="section-title">Swap Calculation</h2>
      <div className="swap-details">
        <p>
          {amount} {sourceToken.toUpperCase()} will get you{' '}
          <strong>{amountToReceive ? amountToReceive.toFixed(6) : 'N/A'}</strong>{' '}
          {destinationToken.toUpperCase()}
        </p>
      </div>
      <div className="price-info">
        {shouldShowEthPrice && (
          <p>
            <strong>Ethereum (ETH) Price:</strong> ${ethPriceUSD ? ethPriceUSD.toFixed(2) : 'N/A'} USD
          </p>
        )}
        {shouldShowBnbPrice && (
          <p>
            <strong>Binance Coin (BNB) Price:</strong> ${bnbPriceUSD ? bnbPriceUSD.toFixed(2) : 'N/A'} USD
          </p>
        )}
      </div>
    </div>
  );
};

export default EthPrice;
