import express from 'express';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { sendResponse } from './utils/apiResponse';
const app = express();
app.use(express.json());
app.use(corsMiddleware);
app.use(requestLogger);
// Health check
app.get('/api/health', (_req, res) => {
    sendResponse(res, 200, { status: 'healthy' });
});
// API routes mounting
import routes from './routes';
app.use('/api', routes);
// Fallback for 404
app.use((_req, _res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    err.code = 'NOT_FOUND';
    next(err);
});
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map