import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import ethUtil from 'ethereumjs-util';
import Currency from '../types/Currency.js';

const validate  = ethUtil.isValidPrivate;

const currencyPathMap = {
  [Currency.BITCOIN]: `m/44'/0'/0'/0/`,
  [Currency.ETHEREUM]: `m/44'/60'/0'/0/`,
  [Currency.LITECOIN]: `m/44'/2'/0'/0/`,
  [Currency.DOGECOIN]: `m/44'/3'/0'/0/`, // Добавлен путь для Dogecoin
  [Currency.DASH]: `m/44'/5'/0'/0/` // Добавлен путь для Dash
};

export default async function parseMnemonicToPrivateKeys(mnemonic, currency, keyCount = 5) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);

  const root = bip32.BIP32Factory(bip32.default).fromSeed(seed)(seed);

  const derivationPath = currencyPathMap[currency];

  const privateKeys = [];
  for (let i = 0; i < keyCount; i++) {
    const path = `${derivationPath}${i}`;
    const child = root.derivePath(path);
    const privateKey = child.privateKey?.toString('hex');

    if (privateKey && validate(Buffer.from(privateKey, 'hex'))) {
      privateKeys.push(privateKey);
    } else {
      throw new Error('Invalid private key generated');
    }
  }

  return privateKeys;
}

