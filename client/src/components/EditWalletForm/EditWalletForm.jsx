import React, { useState, useEffect } from 'react';
import { getWalletById, editWallet, addPrivateKey } from '../../api/walletApi';
import Currency from '../../types/Currency';


const EditWalletForm = ({ walletId, onClose }) => {
  const [wallet, setWallet] = useState(null);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [convertToDollar, setConvertToDollar] = useState(0);
  const [currency, setCurrency] = useState(Currency.BITCOIN);
  const [privateKeys, setPrivateKeys] = useState([]);
  const [newPrivateKey, setNewPrivateKey] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const data = await getWalletById(walletId);
        setWallet(data);
        setDescription(data.description);
        setValue(data.value);
        setConvertToDollar(data.convert_to_dollar);
        setCurrency(data.currency);
        setPrivateKeys(data.private_keys);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWallet();
  }, [walletId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedWallet = { id: walletId, description, value };
      const savedWallet = await editWallet(updatedWallet);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddPrivateKey = async (e) => {
    e.preventDefault();
    try {
      if (!newPrivateKey) {
        setError('Private key cannot be empty');
        return;
      }
      const response = await addPrivateKey(walletId, newPrivateKey);
      setPrivateKeys(response.private_keys); // Обновление списка приватных ключей после добавления нового
      setNewPrivateKey('');
      setError(null);
    } catch (err) {
      setError(err.response.data);
    }
  };

  if (!wallet) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Wallet</h2>
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
        <label>Value:</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Convert to Dollar:</label>
        <input
          type="number"
          value={convertToDollar}
          readOnly
        />
      </div>
      <div>
        <label>Currency:</label>
        <input
          type="text"
          value={currency}
          readOnly
        />
      </div>
      <div>
        <label>Private Keys:</label>
        <ul>
          {privateKeys.map((key, index) => (
            <li key={index}>{key}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>Add Private Key:</label>
        <input
          type="text"
          value={newPrivateKey}
          onChange={(e) => setNewPrivateKey(e.target.value)}
        />
        <button type="button" onClick={handleAddPrivateKey}>Add Key</button>
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditWalletForm;
