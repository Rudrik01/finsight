import express, { Express } from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { sendResponse } from './utils/apiResponse.js';

const app: Express = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(requestLogger);

// Health check
app.get('/api/health', (_req, res) => {
  sendResponse(res, 200, { status: 'healthy' });
});

// API routes mounting
import routes from './routes/index.js';
app.use('/api', routes);


// Fallback for 404
app.use((_req, _res, next) => {
  const err = new Error('Not Found') as Error & { status?: number; code?: string };
  err.status = 404;
  err.code = 'NOT_FOUND';
  next(err);
});

app.use(errorHandler);

export default app;
