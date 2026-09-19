# Project Summary: Quran Teacher CV Platform

This platform is a bilingual (Arabic/English) RTL/LTR teacher CV site with an integrated booking and management system.

## Tech Stack
*   **Frontend:** React 18, Vite, Tailwind CSS
*   **Backend:** NestJS, Prisma, MySQL

## Core Features
*   **Teacher Profile:** Bilingual CV site with interactive elements.
*   **Booking System:** Allows users to request sessions.
*   **User Authentication:** Signup, login, and secure session management using `httpOnly` cookies.
*   **User Profile:** Edit personal details (name), admin management of emails, and password updates.
*   **Admin Dashboard:** Dedicated interface to view, filter, reply to, and delete booking requests.
*   **Notifications:** In-app system with a bell icon for tracking admin replies to bookings.

## API Endpoints

### Auth
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `PATCH /api/v1/auth/me`
- `PATCH /api/v1/auth/change-password`

### Quran Teacher
- `GET /api/v1/quran-teacher/profile`
- `PATCH /api/v1/quran-teacher/profile`
- `POST /api/v1/quran-teacher/sessions`
- `GET /api/v1/quran-teacher/sessions`
- `PATCH /api/v1/quran-teacher/sessions/:id`
- `DELETE /api/v1/quran-teacher/sessions/:id`
- `GET /api/v1/quran-teacher/sessions/my`
- `GET /api/v1/quran-teacher/sessions/notifications/my`
- `PATCH /api/v1/quran-teacher/sessions/:id/reply`
- `PATCH /api/v1/quran-teacher/sessions/:id/seen`

## Security Measures
- **Headers:** Helmet middleware implemented.
- **Rate Limiting:** Applied to sensitive authentication routes.
- **Cookies:** `httpOnly` and secure flags for JWT access and refresh tokens.
- **Database:** Optimized queries with indexes on `Session` (status, userId).

## Environment Variables
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `PORT`
- `FRONTEND_URL`

## Architecture Decisions
- **OptionalJwtAuthGuard:** Used to allow anonymous booking requests while automatically linking the `userId` to the session if the user is logged in.

## Folder Structure
- `backend/`
  - `src/auth/`: Auth logic, strategies, guards, DTOs
  - `src/quran-teacher/`: Teacher profile and session management
  - `prisma/`: Schema and migrations
- `frontend/`
  - `src/components/`: UI components
  - `src/api/`: Axios instances and API services
  - `src/pages/`: Page-level components
