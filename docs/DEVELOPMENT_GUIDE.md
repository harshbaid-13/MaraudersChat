# Development Guide

Quick reference for git workflow and commit conventions.

---

## Git Workflow

### Branch Structure

```
main (production-ready)
  ↓
dev (integration branch)
  ↓
feature/your-name-feature-name (individual work)
```

### Daily Workflow

**1. Start new feature:**

```bash
git checkout dev
git pull origin dev
git checkout -b feature/harsh-friend-system
```

**2. Work and commit:**

```bash
git add .
git commit -m "feat: add friend request endpoints"
git push origin feature/harsh-friend-system
```

**3. Merge to dev:**

```bash
# Create PR on GitHub: feature/harsh-friend-system → dev
# Or merge directly:
git checkout dev
git merge feature/harsh-friend-system
git push origin dev
```

**4. Deploy to main (end of sprint):**

```bash
git checkout main
git merge dev
git push origin main
```

---

## Conventional Commits

### Format

```
type: description
```

### Types

| Type        | Usage            | Example                                      |
| ----------- | ---------------- | -------------------------------------------- |
| `feat:`     | New feature      | `feat: add voice recording component`        |
| `fix:`      | Bug fix          | `fix: resolve WebSocket disconnection issue` |
| `docs:`     | Documentation    | `docs: update API endpoints`                 |
| `style:`    | Formatting only  | `style: format with prettier`                |
| `refactor:` | Code restructure | `refactor: extract auth logic to service`    |
| `test:`     | Add tests        | `test: add unit tests for JWT utils`         |
| `chore:`    | Maintenance      | `chore: update dependencies`                 |

### Real Examples

```bash
# Features
git commit -m "feat: implement friend request system"
git commit -m "feat: add real-time typing indicators"
git commit -m "feat: integrate Gemini API for reply suggestions"

# Fixes
git commit -m "fix: handle null user in message send"
git commit -m "fix: prevent duplicate friend requests"
git commit -m "fix: resolve call connection timeout"

# Documentation
git commit -m "docs: add WebRTC setup guide"
git commit -m "docs: update sprint 1 tasks"

# Other
git commit -m "style: format backend controllers"
git commit -m "refactor: move socket logic to separate service"
git commit -m "chore: upgrade Prisma to v6.18"
```

---

## Quick Commands

```bash
# Check current branch
git branch

# See changes
git status
git diff

# Update from remote
git pull origin dev

# Delete feature branch after merge
git branch -d feature/harsh-friend-system

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- .
```

---

## Pull Request Template

When creating PR on GitHub, use this format:

```markdown
## What changed?

- Added friend request endpoints
- Implemented validation middleware

## Testing

- Tested with Postman: POST /api/v1/friends/request
- Added 3 test users, sent/accepted requests

## Related

Closes #12
```

---

## Tips

- Commit frequently (every logical change)
- Pull from `dev` before starting work to avoid conflicts
- Test locally before pushing
- If stuck, ask in WhatsApp group
- Use `git stash` to save work-in-progress when switching branches
