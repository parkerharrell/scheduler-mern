import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';

import constant from '../config/directory';

const app = express();


if (process.env.NODE_ENV == 'development') {
    require('dotenv').config({ path: '.env.development' });

} else {
    require('dotenv').config();
}

app.set('port',  process.env.APP_PORT);
app.set('host',  process.env.APP_HOST);

app.use(express.static(constant.distDir));

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(constant.assetsDir));

export default app;