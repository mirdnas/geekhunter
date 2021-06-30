import "reflect-metadata";
import express from 'express';

import "./database/connect";
import router from './routes/routes';


const app = express();

app.use( express.json() );
app.use(router);

app.listen(3333, () =>  console.log(' server up ') );
