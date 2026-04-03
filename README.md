# FinSight — Personal Finance Dashboard

FinSight is a modern, responsive personal finance dashboard that allows users to track their balance, analyze spending habits, and manage their transactions. It features a stunning UI built with React and Tailwind CSS, utilizing glassmorphism and fully supporting both dark and light modes.

## Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Recharts (Data Visualization)
- Lucide React (Icons)
- React Router (Navigation)
- Axios (HTTP Client)

### Backend
- Node.js
- Express
- TypeScript
- CORS setup

## Features
- **Dashboard:** Kpi summary cards, a savings trend line chart, top expenses donut chart, and recent transactions list.
- **Transactions Management:** Filter by type/category/date, debounced text search, add new income/expenses, delete records (admin only).
- **Insights & Analytics:** Month-over-month comparison, detailed category breakdown with animated progress bars, and a bar chart analyzing income vs expenses.
- **Role-Based UI:** Viewer mode allows read-only access with certain features hidden, while Admin mode allows full CRUD (Add/Delete/Edit) actions.
- **Theming:** A beautiful dark mode and a crisp light mode. Custom theme configuration with seamless switching.

## Instructions to Run the Application

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### 2. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Copy `.env.example` to `.env` and configure if necessary.
   ```bash
   cp .env.example .env
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should now be running on http://localhost:5000*

### 3. Frontend Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Copy `.env.example` to `.env` and configure accordingly (ensure `VITE_API_URL` points to the running backend):
   ```bash
   cp .env.example .env
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The application should now be running on http://localhost:5173* (or another port provided by Vite).

## Key Implementation Details (Performance & Optimizations)
1. **Lazy Loading:** Using `React.lazy` and `Suspense` for the main feature routes in `App.tsx` significantly decreases initial load time.
2. **Memoization:**
   - **`useMemo`** is used extensively to block expensive recalculations like chart data transforms when dependencies don't change.
   - **`React.memo`** is applied to `TransactionRow` within the `TransactionTable` to prevent re-rendering invariant rows whenever global filter state changes.
3. **Zustand Selectors:** Leveraging Zustand slices with atomic state selection minimizes needless component re-renders.
4. **Theme Toggling:** Chart tick colors, tooltips, and background hues strictly use our active CSS theme values for flawless transitions between light/dark environments.
5. **Debouncing:** Rapid sequence inputs like the transaction text search bar dispatch events effectively without swamping the React render tree using custom `.useDebounce()`.
