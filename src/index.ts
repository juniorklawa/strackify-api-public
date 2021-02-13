import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import admin from 'firebase-admin';
import mongoose from 'mongoose';
import logger from 'morgan';

import routes from './routes';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./config/sountrackioKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(routes);
mongoose.connect('mongo_url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default app;
