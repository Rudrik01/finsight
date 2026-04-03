   # Full-Fledged Vercel Deployment Guide

   Because Vercel is highly optimized for frontend frameworks but requires strict configurations for monolithic Node.js backends, the most reliable and performance-driven way to deploy this monorepo is by creating **two** separate Vercel projects from your single GitHub repository.

   ---

   ## Part 1: Deploying the Backend (Server)

   1. Push your latest code to GitHub.
   2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
   3. Import your `finsight` GitHub repository.
   4. **Configure Project:**
      - **Project Name:** `finsight-api`
      - **Framework Preset:** `Other`
      - **Root Directory:** Click Edit and select `server`.
      - **Build Settings:** Vercel will automatically detect `vercel.json` inside the `server/` folder and use the `@vercel/node` builder. No explicit build command is needed.
      - **Environment Variables:**
      - `NODE_ENV` = `production`
      - *(Optional)* `CORS_ORIGIN` = `(Leave blank for now, or match your future frontend URL)`
   5. Click **Deploy**.
   6. Once deployed, note the **Production URL** (e.g., `https://finsight-api.vercel.app`).
      - *Test it by visiting `https://finsight-api.vercel.app/api/health`. It should return `{"status":"healthy"}`.*

   ---

   ## Part 2: Deploying the Frontend (Client)

   1. Go back to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
   2. Import the exact same `finsight` GitHub repository again.
   3. **Configure Project:**
      - **Project Name:** `finsight-client` (or just `finsight`)
      - **Framework Preset:** Vercel should auto-detect `Vite`.
      - **Root Directory:** Click Edit and select `client`.
      - **Build Command:** `npm run build` (Vercel will auto-detect this).
      - **Output Directory:** `dist` (Vercel will auto-detect this).
      - **Environment Variables:**
      - You **MUST** add your backend URL here so the frontend knows where to fetch data.
      - Name: `VITE_API_URL`
      - Value: `https://finsight-api.vercel.app/api` *(Make sure to append `/api` to the backend URL you copied in Part 1!)*
   4. Click **Deploy**.

   ---

   ## Part 3: Architecture & CORS Security

   - **How CORS was fixed:** The `server/src/middleware/cors.ts` file was rewritten to dynamically accept requests from `localhost`, explicit environments (`CORS_ORIGIN`), and inherently trust any domain ending in `.vercel.app`. This guarantees your frontend Vercel deployment will immediately be allowed to talk to your backend without encountering `Cross-Origin Request Blocked` errors.
   - **Serverless Adaptation:** The Express app was modified in `server/src/index.ts` to export directly. Vercel spins up your API endpoints on-demand perfectly as Serverless Functions via the custom `server/vercel.json` routing configuration!
