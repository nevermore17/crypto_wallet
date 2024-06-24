import { useState, useEffect } from 'react';
import { getAllWallets, deleteWalletById } from "../../api/walletApi"

const useWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchWallets = async () => {
    try {
      setLoading(true);
      const data = await getAllWallets();
      setWallets(data.values);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchWallets();
  }, []);

  const deleteWallet = async (id) => {
    try {
      await deleteWalletById(id);
      setWallets(wallets.filter(wallet => wallet._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { wallets, loading, error, deleteWallet, setWallets, fetchWallets };
};

export default useWallets;