import 'reflect-metadata';
import './container';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

app.use(cors());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

