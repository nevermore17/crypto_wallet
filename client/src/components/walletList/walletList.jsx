import React, { useState } from 'react';
import useWallets from './useWallets';
import AddWalletForm from '../AddWalletForm/AddWalletForm'
import EditWalletForm  from '../EditWalletForm/EditWalletForm'

const WalletList = () => {
  const { wallets, loading, error, deleteWallet, setWallets, fetchWallets } = useWallets();
  const [selectedWalletId, setSelectedWalletId] = useState(null);

  const handleWalletAdded = (newWallet) => {
    setWallets((prevWallets) => [...prevWallets, newWallet]);
  };

  const handleEditWallet = (walletId) => {
    setSelectedWalletId(walletId);

  };

  const handleCloseEditForm = () => {
	console.log(">.<")
    setSelectedWalletId(null);
	fetchWallets();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Wallet List</h1>
      <AddWalletForm onWalletAdded={handleWalletAdded} />
      <ul>
        {wallets.map(wallet => (
          <li key={wallet._id}>
            <h2>{wallet.description}</h2>
            <p>Currency: {wallet.currency}</p>
            <p>Value: {wallet.value}</p>
            <button onClick={() => deleteWallet(wallet._id)}>Delete Wallet</button>
            <button onClick={() => handleEditWallet(wallet._id)}>Edit Wallet</button>
          </li>
        ))}
      </ul>
      {selectedWalletId && (
        <EditWalletForm walletId={selectedWalletId} onClose={handleCloseEditForm} />
      )}
    </div>
  );
};

export default WalletList;
