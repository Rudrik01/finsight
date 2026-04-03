import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3001;

// Only start the server locally. Vercel serverless functions handle this under the hood.
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const startServer = () => {
    try {
      app.listen(PORT, () => {
        console.log(`[Server]: API is running on http://localhost:${PORT}`);
        console.log(`[Environment]: ${process.env.NODE_ENV || 'development'}`);
      });
    } catch (error) {
      console.error('[Startup Error]: Failed to start server', error);
      process.exit(1);
    }
  };

  startServer();
}

export default app;
