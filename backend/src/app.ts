import express, { NextFunction } from 'express';
import { IRequest, IResponse } from './types/express';

// Libraries imports
import morgan from 'morgan';
import cors from 'cors';

// ROUTES


// CONTROLLERS


// MIDDLEWARES




const app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use((req: IRequest, res: IResponse, next: NextFunction) => {
	req.requestTime = new Date().toISOString();
	next();
});


// API routes


app.get('/', (req: IRequest, res: IResponse) => {
	res.send('Hello from the server!');
});




export default app;