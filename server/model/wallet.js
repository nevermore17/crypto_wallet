import mongoose from "mongoose";
import Currency from "../types/Currency.js";

const WalletSchema = new mongoose.Schema({
  description: { 
	type: String,
	required: true,
},
  currency: {
    type: String,
	required: true,
    enum: {
      values: Currency.listCurrencies(), // Убедитесь, что это возвращает массив строк
      message: '{VALUE} is not a valid value'
    }
  },
  private_keys: [{ type: String }],
  value: { type: Number, default: 0},
  convert_to_dollar: {type: Number, default: 0}
});

const Wallet = mongoose.model('Wallet', WalletSchema);

export default Wallet;