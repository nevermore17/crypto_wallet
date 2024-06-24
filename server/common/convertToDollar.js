import Currency from "../types/Currency.js";

const koeficient = {
	[Currency.BITCOIN]: 12,
	[Currency.ETHEREUM]: 7,
	[Currency.LITECOIN]: 15,
	[Currency.DOGECOIN]: 20,
	[Currency.DASH]: 3

}

async function convertToDollar(value, currency=Currency.BITCOIN){
	return koeficient[currency] * value
}


export default convertToDollar