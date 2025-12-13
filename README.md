# 🚀 Turbo Stack - Production-Ready Full-Stack Template

**Enterprise-grade authentication starter** built for rapid deployment. Clone, customize, and ship in hours, not weeks.

> *From Space LEAF Corp: A proven foundation for client projects, scalable MVPs, and production applications.*

## ✨ What's Included

**Authentication System** - Ready out of the box:
- ✅ User signup & login with bcrypt password hashing
- ✅ Secure credential validation
- ✅ Clean REST API endpoints
- ✅ Responsive UI with Tailwind CSS
- ✅ Easy to extend with JWT, OAuth, 2FA

**Modern Tech Stack**:
- **Frontend**: Next.js 14 (App Router) with TypeScript & Tailwind CSS
- **Backend**: Express.js API with TypeScript
- **Database**: Prisma ORM (PostgreSQL/MySQL ready)
- **Monorepo**: Turborepo for blazing-fast builds
- **DevOps**: Docker, Kubernetes/Helm charts included
- **Package Manager**: pnpm for efficient dependency management

## 🎯 Perfect For

- 💼 **Client Projects** - Start every engagement with secure auth
- 🚢 **MVPs** - Ship faster with proven architecture
- 📦 **SaaS Products** - Scale from prototype to production
- 🎓 **Learning** - Study modern full-stack patterns
- 🏢 **Enterprise** - Kubernetes-ready deployment

## 📁 Project Structure

```
turbo_stack-/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── api/          # Express.js backend API
├── packages/
│   └── database/     # Shared Prisma database package
├── package.json      # Root package.json with workspaces
├── turbo.json        # Turborepo configuration
└── docker-compose.yml # Docker services (PostgreSQL, Redis)
```

## ⚡ Quick Start (2 minutes)

### Prerequisites
- Node.js 18+
- pnpm (install: `npm install -g pnpm`)

### Get Running

```bash
# Clone and install
git clone https://github.com/Space-LEAF-corp/turbo_stack-.git
cd turbo_stack-
pnpm install

# Start both servers
pnpm dev --filter backend    # API on :3001
pnpm dev --filter frontend   # Web on :3000
```

**That's it!** Visit http://localhost:3000 and create an account.

### Optional: Full Database Setup

```bash
# Install Docker, then:
docker-compose up -d
pnpm db:setup
```

## 🎨 Customization Guide

### Add Your Branding
```bash
# Update apps/web/src/app/page.tsx
# Change "Turbo Stack" to your product name
# Customize Tailwind colors in apps/web/tailwind.config.js
```

### Extend Authentication
```typescript
// apps/api/src/routes/auth.ts

// Add JWT tokens
import jwt from 'jsonwebtoken';
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

// Add email verification
// Add OAuth (Google, GitHub)
// Add two-factor authentication
// Add password reset flow
```

### Connect a Database
```bash
# Update apps/api/src/routes/auth.ts
# Replace in-memory users array with Prisma:

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: { email, password: hashedPassword }
});
```

## 🏗️ Architecture Highlights

**Monorepo Structure** - Shared code, independent deploys:
```
apps/web      → Frontend (Vercel/Netlify ready)
apps/api      → Backend (Railway/Render ready)
packages/db   → Shared database schemas
```

**Type Safety** - End-to-end TypeScript
**Code Sharing** - Reuse types, utilities, configs
**Fast Builds** - Turborepo caching saves hours
**Easy Scaling** - Add apps/packages as you grow

## 📦 Database Management

**Run migrations**:
```bash
cd packages/database
npx prisma migrate dev --name your_migration_name
```

**Open Prisma Studio** (database GUI):
```bash
cd packages/database
npx prisma studio
```

**Generate Prisma Client**:
```bash
cd packages/database
npx prisma generate
```

## 🚀 Deployment Options

### Option 1: Vercel + Railway (Fastest)
- **Frontend** → Vercel (connect GitHub, auto-deploy)
- **Backend** → Railway (one-click PostgreSQL)
- **Time to deploy**: ~5 minutes

### Option 2: Docker Containers
```bash
docker-compose up -d  # PostgreSQL + Redis + Apps
```

### Option 3: Kubernetes (Enterprise)
```bash
./install-k8s-tools.sh  # Install minikube, helm
./deploy-minikube.sh    # Deploy with Helm charts
```

**Helm Features:**
- 🎭 High availability (2+ replicas)
- 📊 Health checks & monitoring
- 🔄 Auto-scaling ready
- See [KUBERNETES_DEPLOY.md](./KUBERNETES_DEPLOY.md)

## 📚 Documentation

- [AUTH_SYSTEM.md](./AUTH_SYSTEM.md) - Authentication API & security
- [KUBERNETES_DEPLOY.md](./KUBERNETES_DEPLOY.md) - Production K8s setup
- [K8S_ARCHITECTURE.md](./K8S_ARCHITECTURE.md) - System architecture

## 🎯 Use This Template

**GitHub**: Click "Use this template" button above

**Or clone directly:**
```bash
git clone https://github.com/Space-LEAF-corp/turbo_stack-.git my-app
cd my-app
rm -rf .git && git init
pnpm install
```

## 💼 Professional Services

**Built by [Space LEAF Corp](https://github.com/Space-LEAF-corp)**

This template showcases production-ready architecture. Need custom development?

**We deliver:**
- ✅ Secure authentication & authorization systems
- ✅ Scalable full-stack applications
- ✅ Cloud-native deployments (AWS, GCP, Azure)
- ✅ Enterprise integrations & APIs
- ✅ Performance optimization & monitoring

**Contact**: Available for contract work and consulting.

## 📄 License

MIT License - See [LICENSE](./LICENSE)

---

**⭐ Star this repo** if it saved you development time!

**🔗 Share** with teams who need a solid starter template.
