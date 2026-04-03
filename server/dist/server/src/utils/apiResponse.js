export const sendResponse = (res, statusCode, data, message = 'Success') => {
    const response = {
        success: true,
        data,
        message,
        timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
};
export const sendError = (res, statusCode, error, code) => {
    const response = {
        success: false,
        error,
        code,
        timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
};
//# sourceMappingURL=apiResponse.js.map