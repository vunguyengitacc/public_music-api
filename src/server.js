import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './db/connect';
import MasterRouter from './routes/route';


const app = express();

const server = http.createServer(app);

dotenv.config();
connectDB();

app.use(morgan('tiny'));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MasterRouter(app);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });

server.listen(8001, () => {
    console.log('listening on *:8001');
});