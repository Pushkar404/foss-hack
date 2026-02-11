## Expense Tracker – Full-Stack Application

This is a production-ready expense tracker application with:

- **Frontend**: React (Vite) + Tailwind CSS + React Router + Axios + Recharts
- **Backend**: Node.js + Express + MongoDB (Mongoose) + JWT authentication

Each user has their own account, avatar, categories, and expenses. New users start with **no dummy data** and can only access their own expenses.

---

## Project Structure

- `backend/` – REST API (Node, Express, MongoDB)
- `frontend/` – Single-page app (React, Vite, Tailwind)

---

## Backend Setup (`backend/`)

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

Create `.env` in `backend/` based on `.env.example`:

```bash
cp .env.example .env
```

Set:

- `MONGODB_URI` – your MongoDB connection string
- `JWT_SECRET` – a strong random secret
- `PORT` – API port (default `5000`)
- `CLIENT_ORIGIN` – frontend origin (default `http://localhost:5173`)

### 3. Run backend (dev)

```bash
npm run dev
```

API will be available at `http://localhost:5000/api`.

Key endpoints:

- `POST /api/auth/register` – register (name, email, password, avatar)
- `POST /api/auth/login` – login
- `GET /api/auth/me` – current user profile (JWT required)
- `PUT /api/auth/profile` – update profile (name, avatar, categories)
- `GET /api/expenses` – list expenses (JWT required, filtered by user)
- `POST /api/expenses` – create expense
- `PUT /api/expenses/:id` – update expense
- `DELETE /api/expenses/:id` – delete expense

All expense routes are **user-scoped via JWT**; users cannot see each other’s data.

---

## Frontend Setup (`frontend/`)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment

Create `.env` in `frontend/` based on `.env.example`:

```bash
cp .env.example .env
```

Ensure `VITE_API_URL` points to your backend API, e.g.:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run frontend (dev)

```bash
npm run dev
```

Vite will start at `http://localhost:5173`.

---

## Features

- **Authentication**
  - Register with name, email, password, avatar selection
  - Login with email/password
  - JWT stored in `localStorage`
  - Protected routes via `AuthContext` + `ProtectedRoute`

- **User Profile**
  - Name, email, avatar
  - Per-user category list (default + custom)

- **Expenses**
  - Add, edit, delete expenses (amount, category, date, description)
  - All expenses linked to user (`userId`) and isolated per user
  - Filters by date range, category, and search text
  - Empty state for new users

- **Dashboard & Analytics**
  - Total expenses and current month summary
  - Transaction count
  - **Bar chart** for monthly totals
  - **Pie chart** for category distribution

---

## Running Everything

In two terminals:

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

You should now be able to:

1. Register a new user (choose an avatar).
2. Log in and land on the dashboard.
3. Add/edit/delete expenses and see charts update.

