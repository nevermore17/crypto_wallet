import React, { useState } from 'react';
import { createWallet } from '../../api/walletApi';
import Currency from '../../types/Currency';

const AddWalletForm = ({ onWalletAdded }) => {
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState(Currency.BITCOIN);
  const [value, setValue] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWallet = { description, currency, value };
      const wallet = await createWallet(newWallet);
      onWalletAdded(wallet);
      setDescription('');
      setCurrency(Currency.BITCOIN);
      setValue(0);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Wallet</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Currency:</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        >
          {Object.keys(Currency).map((key) => (
            <option key={key} value={Currency[key]}>
              {Currency[key]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Value:</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Add Wallet</button>
    </form>
  );
};

export default AddWalletForm;
