import * as dotenv from 'dotenv';
dotenv.config({ path: './.env'})

const { PORT = 4000, MONGODB_URL } = process.env;

import express, { json } from 'express';

const app = express();
import mongoose from 'mongoose'

import cors from 'cors';

import morgan from 'morgan';

import { isAuthenticated } from './middleware/Authentication.js';
import BaseRouter from './src/routes/index.js'

//Database connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});


// Connection events
mongoose.connection
    .on('open', () => console.log('connected to mongoose'))
    .on('close', () => console.log('mongoose disconnected'))
    .on('error', (error) => console.log(error));

//MiddleWare
app.use(cors()); 
app.use(morgan('dev'));
app.use(json());
app.use('/', isAuthenticated, BaseRouter)

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

