import cors from 'cors';
// const allowedOrigins = [
//   process.env.CORS_ORIGIN || 'http://localhost:5173'
// ];
// export const corsMiddleware = cors({
//   origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// });
export const corsMiddleware = cors();
//# sourceMappingURL=cors.js.map