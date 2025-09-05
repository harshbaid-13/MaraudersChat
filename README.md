# Marauder’s Chat

**Secure Real-time Messaging & Gaming Platform**

A real-time end-to-end encrypted chat platform with text, stickers, voice notes (Howlers), voice/video calls (P2P), scheduled messages, anonymous groups, command-based interactions, and interactive multiplayer games inside the chat UI. Communication is secured with RSA over WebSockets and media is optimized P2P via WebRTC.

---

## Highlights / Features

* Real-time E2E encrypted messaging: text, stickers, media, voice notes (Howlers).
* P2P voice & video calls via WebRTC; optimized peer connections and selective forwarding.
* Unique features: auto-play voice notes (Howlers), anonymous group messaging, scheduled/delayed delivery.
* Command system: slash commands, AI bot responses, and multiplayer game commands embedded inside chats.
* Secure signaling: RSA-based message signing/encryption over WebSockets; optional TURN for NAT traversal.

---

## Tech stack

* Backend: **Node.js**, **Express.js**, WebSockets (ws / socket.io-style), WebRTC signaling
* Frontend: **React** (client SPA)
* Database: **MongoDB** (user/room/message store)
* Crypto: **RSA** for key exchange & signatures; optional libs like `node-forge` / `crypto`
* Optional: **Redis** (presence / pubsub), **Docker / docker-compose**

---

## Architecture overview

* `client/` (React): UI, local key storage (private key per device in secure storage), WebRTC handling, and command/game UI.
* `backend/` (Node): REST API, WebSocket signaling server, RSA crypto helpers, message scheduler, bot/command engine, media relay support (TURN interfacing).
* Peer connections: Signaling over WebSocket -> direct/mesh WebRTC connections for media -> fallback to TURN when required.
* Data persistency: MongoDB for messages, profiles, scheduled jobs; Redis for presence/locks/queues (optional).

---

## Quickstart — install & run (all commands)

*Assumes project root has `backend/` and `client/` subfolders. Adjust scripts according to your repo.*

### Prerequisites

* Node.js (>= 16 recommended) and npm or yarn
* MongoDB running (or a MongoDB URI)
* Redis

### Clone & install

```bash
git clone https://github.com/Keshav76/Marauders-Chat.git
cd marauders-chat

# Backend
cd backend
npm install

# Frontend
cd ../client
npm install
```
---

## File structure (recommended)

```
marauders-chat/
├── README.md
├── docker-compose.yml
├── .env.example
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── index.js                # entry: express + websocket server
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── crypto/             # RSA helpers, key management
│   │   │   ├── signaling/          # WebSocket events & handlers
│   │   │   ├── webrtc/             # ICE/offer/answer helpers
│   │   │   ├── scheduler/          # scheduled message delivery
│   │   │   └── bot/                # command & AI-bot integration
│   │   ├── models/                 # mongoose models (User, Room, Message)
│   │   ├── jobs/                   # cron / queue processors
│   │   └── tests/
│   └── keys/
├── client/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── index.jsx
│       ├── App.jsx
│       ├── components/
│       ├── views/
│       ├── services/               # api, ws, webrtc wrappers
│       ├── hooks/                  # useWebRTC, useHowlerAutoPlay
│       └── styles/
└── infra/                          # optional infra: terraform, k8s, nginx configs
```

---

## WebSocket events & REST endpoints (summary)

### Common REST endpoints

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/users/:id
GET    /api/rooms
POST   /api/rooms
GET    /api/rooms/:roomId/messages?limit=...
POST   /api/rooms/:roomId/messages   # for non-real-time message creation (fallback)
POST   /api/commands/execute
POST   /api/schedule                 # schedule a message
```

### WebSocket / Signaling events (examples)

* `auth` — authenticate socket connection (JWT + device id).
* `presence` — user online/offline updates.
* `offer` / `answer` / `ice-candidate` — WebRTC signaling.
* `message` — real-time chat message (E2E encrypted payload).
* `message:ack` — delivery/read acknowledgements.
* `command` — run slash command (e.g., `/roll`, `/game start`).
* `howler:auto-play` — howler voice-note auto-play control.
* `schedule:create` / `schedule:execute` — scheduling-related events.
* `room:anonymous-join` — anonymous group interactions.

(Implement specific event names to suit your codebase.)

---

## Testing / lint / format / docker commands

Assumed npm scripts (adapt if you use yarn or pnpm):

### Backend scripts (run from `backend/`)

```bash
npm run dev          # start dev server with nodemon / ts-node-dev
npm run start        # start production (node dist/)
npm run build        # transpile (if TypeScript)
npm run test         # run unit tests (jest/mocha)
npm run lint         # eslint
npm run format       # prettier
npm run seed         # seed DB with sample data (for dev)
npm run migrate      # apply DB migrations (if used)
```

### Frontend scripts (run from `client/`)

```bash
npm run start        # react dev server
npm run build        # production build
npm run preview      # serve build locally (optional)
npm run test         # jest / react-scripts test
npm run lint
npm run format
```

---

## Acknowledgements & references

* Built-inspired-by modern encrypted chat and WebRTC signaling patterns.
* Use libraries such as `ws`/`socket.io`, `simple-peer` / native RTCPeerConnection clients for WebRTC, `mongoose` for MongoDB, and Node’s `crypto` or `node-forge` for RSA helpers.

---

## License

MIT — see `LICENSE` file.

---
* generate a ready-to-copy `.env.example`, `docker-compose.yml` skeleton, and `package.json` scripts tailored to your repo layout; or
* write a short CONTRIBUTING.md or a sample `docker-compose.yml` with Mongo & coturn.

Which of those would you like me to add right now? (I can produce them immediately.)
