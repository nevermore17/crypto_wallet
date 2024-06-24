import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/wallet'; // Замените на ваш базовый URL, если он отличается

// Функция для получения всех кошельков
export async function getAllWallets() {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallets:', error);
    throw error;
  }
}

// Функция для получения одного кошелька по ID
export async function getWalletById(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching wallet with id ${id}:`, error);
    throw error;
  }
}

// Функция для создания нового кошелька
export async function createWallet(walletData) {
  try {
    const response = await axios.post(API_BASE_URL, walletData);
    return response.data;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
}

// Функция для удаления кошелька по ID
export async function deleteWalletById(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting wallet with id ${id}:`, error);
    throw error;
  }
}

// Функция для добавления приватного ключа в кошелек
export async function addPrivateKey(id, privateKey) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/add_private_key`, { id, privateKey });
    return response.data;
  } catch (error) {
    console.error('Error adding private key:', error);
    throw error;
  }
}

// Функция для редактирования кошелька
export async function editWallet(walletData) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/edit`, walletData);
    return response.data;
  } catch (error) {
    console.error('Error editing wallet:', error);
    throw error;
  }
}