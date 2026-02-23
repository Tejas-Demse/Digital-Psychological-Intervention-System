# MindCare Portal (Digital Psychological Intervention System)

This repository contains the foundational code for the MindCare student portal. It is divided into two main environments: the Django REST Framework backend and the React (Vite) frontend.

---

## 🚀 1. Backend Setup (Django)

The backend handles our primary business logic, database connections, and authentication. It is located in the `backend/` folder.

### Prerequisites

- Python 3.10+ installed
- MongoDB installed locally (or an Atlas URI)

### Installation Steps

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:

   ```bash
   python -m venv venv

   # Windows:
   .\venv\Scripts\activate

   # macOS/Linux:
   source venv/bin/activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your environment variables:
   - Copy the `.env.example` file and rename it to `.env`:
     ```bash
     cp .env.example .env
     ```
   - _Ensure your local MongoDB is running!_

5. Apply database migrations:
   ```bash
   python manage.py migrate
   ```
6. Start the development server:
   ```bash
   python manage.py runserver
   ```
   _The backend should now run at `http://localhost:8000/`_

---

## 🎨 2. Frontend Setup (React/Vite)

The frontend is built with React, Vite, and tailwind/custom CSS. It communicates with the Django backend.

### Prerequisites

- Node.js (v18+)

### Installation Steps

1. Navigate to the frontend directory:
   ```bash
   cd "Digital Psychological Intervention System (1)"
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy the `.env.example` file and rename it to `.env`:
     ```bash
     cp .env.example .env
     ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   _The frontend should now run at `http://localhost:5173/`_

---

## 🤝 Branching & Contribution Guide

- **Never push directly to `main`.**
- Create a branch for your specific feature (e.g., `feature/login-ui` or `backend/assessments-api`).
- Ensure your `.env` variables are never committed.
- Once your feature works, open a Pull Request to merge it back into `main`.
