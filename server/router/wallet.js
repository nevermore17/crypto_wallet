import Router from 'koa-router'
import * as controller from "../controller/wallet.js"

const wallet = Router({
	prefix: '/wallet'
  })

wallet.get('/', controller.getAll)
wallet.get('/:id', controller.getOne)
wallet.post('/', controller.add)
wallet.delete('/:id', controller.remove)
wallet.patch('/add_private_key', controller.addPrivatekey)
// wallet.patch('/add_seed_phrase', controller.addSeedPhrase)
wallet.patch('/edit', controller.update)

export default wallet 