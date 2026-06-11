# Enterprise CRM System

A full-stack enterprise CRM scaffold built with React, Node.js, MongoDB, and REST APIs.

## Features
- Lead tracking and deal stages
- Sales performance dashboards
- Email and activity logs
- Role-based access control

## Structure
- `backend/` - Node.js API with Express and MongoDB
- `frontend/` - React UI built with Vite

## Getting Started
1. Install dependencies for both workspaces:
   ```bash
   npm install
   ```
2. Create `.env` in `backend/` from `.env.example`.
3. Start the backend and frontend separately:
   ```bash
   npm run dev:backend
   ```
   ```bash
   npm run dev:frontend
   ```

## Live Demo
- **URL:** [https://enterprise-crm-backend-bfqm.onrender.com](https://enterprise-crm-backend-bfqm.onrender.com)
- **Demo Credentials:**
  - Email: `admin@example.com`
  - Password: `admin123`

## Notes
- Backend uses JWT-based authentication.
- Role-based access is enforced on protected routes.
- The frontend includes dashboard and lead management screens.
