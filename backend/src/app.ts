import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/error';
import authRoutes from './routes/auth.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'public', 'favicon.ico')));
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/v1/auth', authRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;