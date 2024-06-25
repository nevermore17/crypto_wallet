import Koa from 'koa'
import mongoose from 'mongoose';
import cors from '@koa/cors'


import bodyParser from 'koa-bodyparser';

import { wallet } from './router/index.js';


const app = new Koa();

app.use(bodyParser())
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.use(wallet.routes());

app.listen(3000, function(){
	console.log('Server running on https://localhost:3000')
 });