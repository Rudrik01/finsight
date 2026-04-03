import cors from 'cors';

export const corsMiddleware = cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    const explicitOrigin = process.env.CORS_ORIGIN;
    
    // Check if origin exactly matches explicit env origin, localhost, or is a vercel preview deployment
    const isAllowed = 
      (explicitOrigin && origin === explicitOrigin) ||
      origin.startsWith('http://localhost:') ||
      origin.endsWith('.vercel.app');

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
});
 