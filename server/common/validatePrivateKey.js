import ethUtil from 'ethereumjs-util';

const validate  = ethUtil.isValidPrivate;

export default function validatePrivateKey(privateKey) {
	return privateKey && validate(Buffer.from(privateKey, 'hex'))
}