# Sprint Plan

## 🎯 Features to Implement

1. ✅ End-to-end encryption for user privacy
2. ✅ Auto-play voice notes (Howlers)
3. ✅ Anonymous group chats
4. ✅ Scheduled message delivery
5. ✅ AI-powered reply suggestions
6. ✅ WebRTC for secure voice/video calls

---

## Sprint 1 (Week 1): Core Messaging + Auth

**Dates:** Days 1-7  
**Goal:** Users can register, login, add friends, and send/receive real-time text messages

### Developer 1: Auth + Profile (Full-Stack)

#### Backend Tasks

- [ ] Create auth middleware (JWT verification for protected routes)
- [ ] Implement user profile endpoints:
  - `GET /api/v1/users/:id` - Get user profile
  - `PUT /api/v1/users/:id` - Update profile (name, bio, avatar)
- [ ] Create user search endpoint:
  - `GET /api/v1/users/search?q=username` - Search users by username

#### Frontend Tasks

- [ ] Build auth pages:
  - Login form with validation
  - Register form with validation
  - Password strength indicator
- [ ] Implement protected route wrapper (redirect to login if no token)
- [ ] Create auth context for token management (login/logout/refresh)
- [ ] Build user profile page with edit capability
- [ ] Add profile picture upload UI

**Files to Create:**

- `backend/src/middleware/auth.ts`
- `backend/src/controllers/user.controller.ts`
- `backend/src/routes/user.routes.ts`
- `frontend/src/app/login/page.tsx`
- `frontend/src/app/register/page.tsx`
- `frontend/src/contexts/AuthContext.tsx`
- `frontend/src/components/ProtectedRoute.tsx`

---

### Developer 2: Friends System (Full-Stack)

#### Backend Tasks

- [ ] Implement friend request endpoints:
  - `POST /api/v1/friends/request` - Send friend request
  - `POST /api/v1/friends/accept/:requestId` - Accept request
  - `POST /api/v1/friends/reject/:requestId` - Reject request
  - `GET /api/v1/friends/requests` - List pending requests
  - `DELETE /api/v1/friends/:friendshipId` - Remove friend
- [ ] Create block/unblock endpoints:
  - `POST /api/v1/users/:id/block`
  - `DELETE /api/v1/users/:id/unblock`
- [ ] Add friend list endpoint with online status:
  - `GET /api/v1/friends` - Returns friends with `isOnline` flag

#### Frontend Tasks

- [ ] Build friend list sidebar component
- [ ] Add online/offline status indicators (green/gray dots)
- [ ] Create "Add Friend" UI (search users modal)
- [ ] Build friend request notifications (badge count)
- [ ] Implement accept/reject buttons for requests
- [ ] Add real-time presence updates (subscribe to user status events)

**Files to Create:**

- `backend/src/controllers/friend.controller.ts`
- `backend/src/routes/friend.routes.ts`
- `backend/src/services/friend.service.ts`
- `frontend/src/components/FriendList.tsx`
- `frontend/src/components/AddFriendModal.tsx`
- `frontend/src/components/FriendRequests.tsx`

---

### Developer 3: Real-Time Messaging (Full-Stack)

#### Backend Tasks

- [ ] Set up Socket.IO server in `backend/src/server.ts`
- [ ] Implement WebSocket authentication (verify JWT on connection)
- [ ] Create message endpoints:
  - `POST /api/v1/conversations` - Create 1-1 conversation
  - `GET /api/v1/conversations` - List user conversations
  - `GET /api/v1/conversations/:id/messages` - Get messages (paginated)
  - `POST /api/v1/messages` - Send message (also via WebSocket)
- [ ] Add WebSocket events:
  - `message:send` - Real-time message delivery
  - `typing:start` / `typing:stop` - Typing indicators
  - `presence:online` / `presence:offline` - User status
- [ ] Implement message pagination (20 messages per page)

#### Frontend Tasks

- [ ] Set up Socket.IO client and React context
- [ ] Build main chat layout:
  - Sidebar (conversation list)
  - Message area (scrollable message list)
  - Input area (text input + send button)
- [ ] Implement message list with real-time updates
- [ ] Add typing indicator display ("User is typing...")
- [ ] Create message input with send functionality (Enter key)
- [ ] Add infinite scroll for message history

**Files to Create:**

- `backend/src/sockets/index.ts`
- `backend/src/sockets/message.handler.ts`
- `backend/src/controllers/conversation.controller.ts`
- `backend/src/controllers/message.controller.ts`
- `backend/src/routes/conversation.routes.ts`
- `backend/src/routes/message.routes.ts`
- `frontend/src/contexts/SocketContext.tsx`
- `frontend/src/app/chat/page.tsx`
- `frontend/src/components/ChatLayout.tsx`
- `frontend/src/components/MessageList.tsx`
- `frontend/src/components/MessageInput.tsx`

**Sprint 1 Deliverable:** Working 1-1 text chat with friends system

---

## Sprint 2 (Week 2): Advanced Features + Groups

**Dates:** Days 8-14  
**Goal:** Add Howlers, scheduled messages, anonymous groups, and group messaging

### Developer 1: Howlers + File Upload (Full-Stack)

#### Backend Tasks

- [ ] Set up Cloudinary SDK and config
- [ ] Create file upload endpoints:
  - `POST /api/v1/upload/audio` - Upload Howler (voice note)
  - `POST /api/v1/upload/image` - Upload image
  - `POST /api/v1/upload/video` - Upload video
- [ ] Add Attachment model operations (link files to messages)
- [ ] Implement file validation (max size, allowed types)
- [ ] Store file metadata (duration for audio, thumbnail for video)

#### Frontend Tasks

- [ ] Build voice recording component using MediaRecorder API
- [ ] Add record/stop/play controls for Howlers
- [ ] Implement Howler player with:
  - Auto-play toggle (user preference)
  - Playback progress bar
  - Speed controls (1x, 1.5x, 2x)
- [ ] Create image/video upload UI with preview
- [ ] Display file attachments in message bubbles
- [ ] Add download buttons for attachments

**Files to Create:**

- `backend/src/config/cloudinary.ts`
- `backend/src/controllers/upload.controller.ts`
- `backend/src/routes/upload.routes.ts`
- `backend/src/services/cloudinary.service.ts`
- `frontend/src/components/VoiceRecorder.tsx`
- `frontend/src/components/HowlerPlayer.tsx`
- `frontend/src/components/FileUpload.tsx`
- `frontend/src/components/AttachmentDisplay.tsx`

---

### Developer 2: Group Chats + Anonymous Mode (Full-Stack)

#### Backend Tasks

- [ ] Implement group conversation endpoints:
  - `POST /api/v1/conversations/group` - Create group
  - `PUT /api/v1/conversations/:id` - Update group (name, avatar)
  - `DELETE /api/v1/conversations/:id` - Delete group
- [ ] Create group member endpoints:
  - `POST /api/v1/conversations/:id/members` - Add members
  - `DELETE /api/v1/conversations/:id/members/:userId` - Remove member
  - `PUT /api/v1/conversations/:id/members/:userId/role` - Promote to admin
- [ ] Add anonymous group logic:
  - Flag conversations as anonymous in DB
  - Hide sender identity in message responses for anonymous groups
  - Return "Anonymous" instead of username
- [ ] Implement group message broadcasting via WebSocket

#### Frontend Tasks

- [ ] Build group creation modal:
  - Select friends (multi-select)
  - Set group name and description
  - Upload group avatar
  - Toggle anonymous mode
- [ ] Create group member management UI:
  - List members with roles
  - Add/remove member buttons (admin only)
  - Promote to admin button (owner only)
- [ ] Build anonymous group chat interface:
  - Hide sender names in message bubbles
  - Show "Anonymous" label
  - Hide profile pictures in anonymous mode
- [ ] Create group settings page

**Files to Create:**

- `backend/src/controllers/group.controller.ts`
- `backend/src/services/group.service.ts`
- `frontend/src/components/CreateGroupModal.tsx`
- `frontend/src/components/GroupMemberList.tsx`
- `frontend/src/components/GroupSettings.tsx`
- `frontend/src/components/AnonymousChatBubble.tsx`

---

### Developer 3: Scheduled Messages + AI Suggestions (Full-Stack)

#### Backend Tasks

- [ ] Set up Bull queue or node-cron for scheduled messages
- [ ] Create scheduled message endpoints:
  - `POST /api/v1/messages/schedule` - Schedule a message
  - `GET /api/v1/messages/scheduled` - List user's scheduled messages
  - `DELETE /api/v1/messages/scheduled/:id` - Cancel scheduled message
- [ ] Implement cron job to send scheduled messages at specified time
- [ ] Set up Gemini API integration
- [ ] Create AI suggestion endpoint:
  - `POST /api/v1/ai/suggestions` - Generate reply suggestions
  - Pass last 5 messages as context
  - Return 3 suggested replies
- [ ] Add rate limiting for AI endpoint (10 requests/min per user)

#### Frontend Tasks

- [ ] Build scheduled message UI:
  - Add clock icon to message input
  - Date/time picker modal
  - Confirm schedule button
- [ ] Create scheduled messages list view:
  - Show pending scheduled messages
  - Display scheduled time
  - Cancel button for each
- [ ] Implement AI reply suggestion button (sparkle icon)
- [ ] Build suggestion display UI:
  - Show 3 AI-generated replies
  - Click to insert into message input
  - Loading state while generating
- [ ] Add error handling for AI failures

**Files to Create:**

- `backend/src/services/scheduler.service.ts`
- `backend/src/services/ai.service.ts`
- `backend/src/controllers/scheduler.controller.ts`
- `backend/src/routes/scheduler.routes.ts`
- `frontend/src/components/ScheduleMessageModal.tsx`
- `frontend/src/components/ScheduledMessagesList.tsx`
- `frontend/src/components/AISuggestions.tsx`

**Sprint 2 Deliverable:** Groups, Howlers, scheduled messages, AI suggestions working

---

## Sprint 3 (Week 3): WebRTC Calls + E2E Encryption + Polish

**Dates:** Days 15-21  
**Goal:** Add voice/video calls, complete E2E encryption, and polish UX

### Developer 1: WebRTC Voice/Video Calls (Full-Stack)

#### Backend Tasks

- [ ] Install Agora server SDK
- [ ] Create Agora token generation endpoint:
  - `POST /api/v1/calls/token` - Generate secure token for call
  - Returns: `{ token, channel, uid }`
- [ ] Implement call endpoints:
  - `POST /api/v1/calls` - Initiate call (create Call record)
  - `PUT /api/v1/calls/:id/status` - Update call status
  - `POST /api/v1/calls/:id/end` - End call
  - `GET /api/v1/calls/history` - Get call history
- [ ] Add WebSocket events for call signaling:
  - `call:incoming` - Notify receiver
  - `call:accepted` - Start call
  - `call:declined` - End call
  - `call:ended` - Clean up

#### Frontend Tasks

- [ ] Install and configure Agora RTC SDK
- [ ] Build incoming call screen:
  - Show caller info
  - Ringtone audio
  - Accept/Decline buttons
- [ ] Build outgoing call screen:
  - Show "Calling..." state
  - Cancel button
- [ ] Create in-call UI:
  - Video streams (local + remote)
  - Audio-only mode (show avatar)
  - Controls: Mute, Camera toggle, Speaker, Hang up
  - Call duration timer
- [ ] Implement call participant UI (show multiple streams for group calls)
- [ ] Build call history page

**Files to Create:**

- `backend/src/config/agora.ts`
- `backend/src/controllers/call.controller.ts`
- `backend/src/services/call.service.ts`
- `backend/src/routes/call.routes.ts`
- `frontend/src/components/IncomingCall.tsx`
- `frontend/src/components/CallScreen.tsx`
- `frontend/src/components/CallControls.tsx`
- `frontend/src/app/calls/page.tsx`

---

### Developer 2: E2E Encryption (Full-Stack)

#### Backend Tasks

- [ ] Create RSA key endpoints:
  - `POST /api/v1/keys/generate` - Generate and store key pair
  - `GET /api/v1/keys/public/:userId` - Get user's public key
  - `PUT /api/v1/keys/public` - Update public key
- [ ] Implement encryption utilities:
  - RSA encrypt/decrypt functions
  - Key exchange flow on conversation creation
- [ ] Modify message storage:
  - Store encrypted content for 1-1 chats
  - Keep group messages unencrypted (for simplicity)
- [ ] Add E2E flag to conversations
- [ ] Return public keys with conversation data

#### Frontend Tasks

- [ ] Implement client-side RSA key generation (Web Crypto API)
- [ ] Create key management:
  - Generate key pair on first login
  - Store private key in localStorage (secure storage)
  - Upload public key to server
- [ ] Add message encryption before sending (1-1 chats only)
- [ ] Decrypt received messages using private key
- [ ] Build key management UI:
  - View public key (QR code or copy button)
  - Backup/export private key
  - Warning about key loss
- [ ] Add E2E encryption indicator in chat header (lock icon)

**Files to Create:**

- `backend/src/controllers/key.controller.ts`
- `backend/src/services/encryption.service.ts`
- `backend/src/routes/key.routes.ts`
- `backend/src/utils/crypto.ts`
- `frontend/src/utils/encryption.ts`
- `frontend/src/contexts/EncryptionContext.tsx`
- `frontend/src/components/KeyManagement.tsx`

---

### Developer 3: UX Polish + Notifications (Full-Stack)

#### Backend Tasks

- [ ] Implement read receipt endpoints:
  - `POST /api/v1/messages/:id/read` - Mark message as read
  - `GET /api/v1/conversations/:id/unread` - Get unread count
- [ ] Create message search endpoint:
  - `GET /api/v1/messages/search?q=text` - Search messages
  - Full-text search across user's conversations
- [ ] Add unread message count to conversation list
- [ ] Refine online presence system:
  - Update `lastSeen` on activity
  - Broadcast presence changes via WebSocket

#### Frontend Tasks

- [ ] Add message read receipts UI:
  - Single checkmark: sent
  - Double checkmark: delivered
  - Blue double checkmark: read
- [ ] Implement browser notifications:
  - Request permission on login
  - Show notification for new messages when tab not focused
  - Play sound for notifications
- [ ] Polish responsive design:
  - Mobile: full-screen chat, swipeable sidebar
  - Desktop: three-column layout
  - Tablet: two-column layout
- [ ] Add loading states and skeletons
- [ ] Implement error handling and toast notifications
- [ ] Integrate emoji picker (use emoji-picker-react)
- [ ] Build message search UI (search bar in chat header)
- [ ] Add unread message badges to conversations

**Files to Create:**

- `backend/src/controllers/receipt.controller.ts`
- `backend/src/services/search.service.ts`
- `frontend/src/components/ReadReceipt.tsx`
- `frontend/src/components/NotificationManager.tsx`
- `frontend/src/components/EmojiPicker.tsx`
- `frontend/src/components/MessageSearch.tsx`
- `frontend/src/components/UnreadBadge.tsx`
- `frontend/src/hooks/useNotifications.ts`

**Sprint 3 Deliverable:** Full-featured app matching resume claims

---

## 🤝 Collaboration Guidelines

### Daily Async Standup (WhatsApp)

Post daily (by 10 AM):

```
✅ Yesterday: [completed task]
🚀 Today: [working on task]
🚧 Blockers: [any issues or none]
```

### Mid-Sprint Sync (Every 3-4 Days, GMeet 30 min)

- Demo progress to each other
- Test integrations (frontend ↔ backend)
- Review API contracts (match request/response formats)
- Discuss shared components
- Merge feature branches to `dev`

### End-of-Sprint Demo (Friday, GMeet 1 hour)

- Live demo of all completed features
- Create bug tickets for issues found
- Plan adjustments for next sprint
- Celebrate wins 🎉

---

## ✅ Definition of Done

A task is complete when:

1. ✅ Code is written and working locally
2. ✅ No ESLint errors (warnings OK)
3. ✅ Tested with at least 2 users (use different browsers)
4. ✅ Merged to `dev` branch
5. ✅ You can explain how it works to the team

---

## 🎯 Success Metrics

By end of Week 3:

- ✅ All 6 features working in production
- ✅ Each developer can demo any part of the app
- ✅ Live demo with 3 simultaneous users succeeds
- ✅ CI pipeline passing on `main` branch
- ✅ Team can confidently answer interview questions about:
  - WebSocket architecture
  - E2E encryption flow
  - WebRTC peer connections
  - AI integration patterns
  - Real-time state management

---

**Let's build something amazing! 🚀**
