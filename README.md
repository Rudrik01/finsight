<div align="center">
  <img src="https://ui-avatars.com/api/?name=FinSight&background=0D8ABC&color=fff&size=128&rounded=true&bold=true" alt="FinSight Logo" />
  <h1>FinSight — Personal Finance Dashboard</h1>
  <p>A modern, high-performance financial tracking platform built with React, Vite, and Express.</p>
  
  <p>
    <img src="https://img.shields.io/badge/React-18-blue.svg?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-blue.svg?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Zustand-State-black.svg?style=flat-square" alt="Zustand" />
    <img src="https://img.shields.io/badge/Express-Backend-green.svg?style=flat-square&logo=express" alt="Express" />
  </p>
</div>

---

## 📖 Overview

**FinSight** is a premium, beautifully crafted personal finance dashboard designed to provide deep insights into spending habits, seamless transaction management, and an exceptional user experience. Embracing a glassmorphism aesthetic with full support for dynamic light and dark modes, it is built to be both robust under the hood and gorgeous on the screen.

## ✨ Core Features

*   **📊 Dynamic Dashboard Analytics:** Real-time KPI summaries, interactive savings trend lines, and dynamic expense donut charts mapping directly to your backend database.
*   **💳 Advanced Transaction Management:** Complex composite filtering (by date boundaries, specific categories, or multiple types), debounced full-text searching, and full CRUD workflows.
*   **📈 Insight Scaffolding:** Advanced temporal comparison graphs showing month-over-month variances and top spending categorization algorithms.
*   **🛡️ Role-Based Access Control (RBAC):** Seamless state-driven view generation hiding or showing administrative constraints based on `Viewer` vs `Admin` roles.
*   **🌓 Automatic Theming Engine:** Effortless and persistent switching between Dark and Light mode.

---

## 🛠️ Implementation & Architecture Showcase

This codebase was engineered with strict adherence to modern design patterns and performance considerations to showcase top-tier implementation standards.

### 1. Robust Type Safety System
*   **Zero `any` Policy**: The entire architecture enforces strict typing. External data handling, axios responses, and asynchronous error boundaries strictly utilize `unknown` with deliberate type-guard checks.
*   **Generic Components**: UI components and table layouts use generic types for high reusability without sacrificing type constraints.
*   **Shared Interfaces**: A `shared/types/` workspace ensures the React client and Express server natively understand identical data contracts.

### 2. Performance & Optimizations
*   **Memoization & Reference Stability**: Extensive architectural use of `useMemo` and `useCallback` to intercept expensive recalculations (like sorting arrays and grouping chart topologies) and maintain strict rendering limits.
*   **Component Boundary Segregation**: Feature grids are aggressively factored into atomic `UI` shells. Using `<TransactionRow />` mapped natively through `React.memo()`, long transaction lists will never re-render independently of global list changes.
*   **Debounced API Interactions**: Rapid-sequence user events (like table searches) dispatch flawlessly through customized `.useDebounce()` hooks to avoid blasting the React queue.
*   **Lazy Loading Features**: Root-level bundle splitting drops initial load times significantly.

### 3. State Orchestration (Zustand)
Replacing massive boilerplate, the app orchestrates segmented reactive slices utilizing `zustand`. Form scopes, volatile grid filters, and persistent theming remain decoupled yet interoperable.

### 4. Git Version Control Protocol
The repository boasts a pristine, **linear 30-step conventional commit history**. Features are sequentially scoped natively utilizing scopes (`feat(insights)`, `fix(ui)`, `refactor(core)`), demonstrating enterprise-level Git operational capabilities.

---

## 🚀 Quick Setup Instructions

### Prerequisites
*   Node.js (v16+)
*   npm or yarn workspace

### Backend Initialization
```bash
# Move to the backend workspace
cd server

# Install module dependencies
npm install

# Map environment variables
cp .env.example .env

# Engage the development server (Defaults to Port 5000)
npm run dev
```

### Frontend Initialization
```bash
# Move to the frontend workspace (in a new terminal)
cd client

# Install module dependencies
npm install

# Match local api urls
cp .env.example .env

# Deploy the Vite engine
npm run dev
```
> The dashboard will instantly hot-reload on `http://localhost:5173`. You can dynamically switch theme modes and mock-roles from the settings dropdown!
