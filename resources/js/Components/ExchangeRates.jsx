import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const marqueeAnimation = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
`;

const ExchangeRatesContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  .exchange-rates {
    color: #fff;
    padding: 8px;
    overflow: hidden;

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .currencies-container {
      display: flex;
      align-items: center;
      overflow: hidden;

      .animate-marquee {
        animation: ${marqueeAnimation} 70s linear infinite;
        display: flex;
        align-items: center;
      }

      .currency-item {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        white-space: nowrap;
        font-weight: bold;
      }
    }
  }
`;

export default function ExchangeRates() {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    // Fetch exchange rates from API
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => response.json())
      .then((data) => setRates(data.rates))
      .catch((error) => console.log(error));
  }, []);

  if (!rates) {
    return <div>Loading exchange rates...</div>;
  }

  // Define the currencies to display
  const currencies = [
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
  ];

  return (
    <ExchangeRatesContainer>
      <div className="exchange-rates bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500">
        
        <div className="currencies-container">
          <div className="animate-marquee">
            {currencies.map(({ code, name }) => (
              <div key={code} className="currency-item">
                <span>[{code}]</span>
                <span>{name}</span>
                <span> / 1 USD = {rates[code].toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ExchangeRatesContainer>
  );
}
