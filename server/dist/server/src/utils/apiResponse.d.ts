import { Response } from 'express';
export declare const sendResponse: <T>(res: Response, statusCode: number, data: T, message?: string) => Response<any, Record<string, any>>;
export declare const sendError: (res: Response, statusCode: number, error: string, code: string) => Response<any, Record<string, any>>;
//# sourceMappingURL=apiResponse.d.ts.map