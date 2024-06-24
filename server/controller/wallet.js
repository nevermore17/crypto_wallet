import convertToDollar from "../common/convertToDollar.js";
import Wallet from "../model/wallet.js"
import validatePrivateKey from "../common/validatePrivateKey.js"
import parseMnemonicToPrivateKeys from "../common/parseMnemonicToPrivateKeys.js"

async function getAll(ctx){
	const wallets = await Wallet.find().select('-private_keys').exec();
	ctx.body = {
		values: wallets
	};
}

async function getOne(ctx){
	const id = ctx.params.id

	if (!id){ 
		ctx.throw(400,"Request param err")
	}

	try{
		const wallet = await Wallet.findById(id)	
		ctx.body = wallet

	} catch (e){
		console.log(e)
		ctx.throw(400,"Wallet not found")
	}
}

async function update(ctx){

	try{
		const id = ctx.request.body.id
		const description = ctx.request.body.description
		const value = ctx.request.body.value
		const wallet = await Wallet.findById(id)	
		const converted = await convertToDollar(value, wallet.currency)
		
		wallet.description = description
		wallet.value = value
		wallet.convert_to_dollar = converted

		await wallet.save()
		ctx.body = wallet

	} catch (e){
		console.log(e)
		ctx.throw(400,"Request param err")
	}

}

async function add(ctx){
	const newWallet = new Wallet(ctx.request.body)
	newWallet.convert_to_dollar = await convertToDollar(newWallet.value, newWallet.currency)
	const wallet = await newWallet.save()

	ctx.body = wallet
}

async function remove(ctx){
	const id = ctx.params.id
	await Wallet.findByIdAndDelete(id)
	ctx.body = {
		message: "Wallet was deleted"
	}
}

async function addPrivatekey(ctx){
	const id = ctx.request.body.id
	const privateKey = ctx.request.body.privateKey

	try {
		validatePrivateKey(privateKey)
	} catch(e) {
		ctx.throw(400,'Private key is not valid')
	}

	if (!(id && privateKey)){ 
		ctx.throw(400,"Request param err")
	}

	try {
		const wallet = await Wallet.findById(id)
		wallet.private_keys.push(privateKey)
		await wallet.save()
		ctx.body = wallet

	} catch (e){
		ctx.throw(400,"Wallet not found")
	}

	
}

async function addSeedPhrase(ctx){
	const id = ctx.request.body.id
	const mnemonic = ctx.request.body.mnemonic


	if (!(id && mnemonic)){ 
		ctx.throw(400,"Request param err")
	}

	try {
		const wallet = await Wallet.findById(id)

		const privateKeys = await parseMnemonicToPrivateKeys(mnemonic ,wallet.currency)

		wallet.private_keys.push(...privateKeys)
		await wallet.save()
		ctx.body = wallet

	} catch (e){
		console.log(e)
		ctx.throw(400,"Wallet not found")
	}

	
}

export {getAll, getOne, update, add, remove, addPrivatekey, addSeedPhrase}