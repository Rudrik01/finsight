import { sendError } from '../utils/apiResponse';
export const errorHandler = (err, _req, res, _next) => {
    console.error('[Error]:', err.message || err);
    const statusCode = err.status || 500;
    const message = statusCode === 500 ? 'Something went wrong. Please try again.' : err.message || 'Internal Server Error';
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    sendError(res, statusCode, message, code);
};
//# sourceMappingURL=errorHandler.js.map