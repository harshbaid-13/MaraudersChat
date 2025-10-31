# Marauder's Chat

**Secure Real-time Messaging & Gaming Platform**

A real-time end-to-end encrypted chat platform with text, stickers, voice notes (Howlers), voice/video calls (P2P), scheduled messages, anonymous groups, command-based interactions, and interactive multiplayer games inside the chat UI.

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, Prisma ORM
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Database:** PostgreSQL
- **Auth:** JWT (access + refresh tokens)
- **Tooling:** ESLint, Prettier, Husky, lint-staged

---

## Quickstart

### Prerequisites

- Node.js >= 18
- PostgreSQL running locally or remote instance
- Git

### Clone & Install

```bash
git clone https://github.com/Keshav76/Marauders-Chat.git
cd MaraudersChat

# Install root dependencies (Husky)
npm ci

# Install backend & frontend
npm --prefix backend ci
npm --prefix frontend ci
```

### Environment Setup

**Backend** — create `backend/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/marauders_chat"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=5000
```

**Frontend** — create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Database Setup

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### Run Dev Servers

```bash
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

---

## Development Workflow

- **Lint:** `npm run lint:backend` / `npm run lint:frontend`
- **Format:** `npm run format:backend` / `npm run format:frontend`
- **Build:** `npm --prefix backend run build` / `npm --prefix frontend run build`
- **Prisma Studio:** `npm --prefix backend run prisma:studio`

Pre-commit hooks automatically lint and format staged files.

---

## Documentation

- [API Documentation](./docs/API_DOCUMENTATION.md) — REST endpoints & request/response formats
- [Implementation Summary](./docs/IMPLEMENTATION_SUMMARY.md) — Current development status

---

## License

MIT — see `LICENSE` file.
