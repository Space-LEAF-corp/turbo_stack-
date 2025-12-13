# Turbo Stack

A lineage-safe, joyful, exponential learning system that protects while it teaches, that wraps every child (and every tired adult) in gentleness while still reaching for the stars.

## 🚀 Tech Stack

This is a **Turborepo** monorepo featuring:

- **Frontend**: Next.js 14 (App Router) with TypeScript, React 18, and Tailwind CSS
- **Backend**: Express.js API with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Package Manager**: npm workspaces
- **Build System**: Turborepo for monorepo orchestration
- **Containerization**: Docker & Docker Compose

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

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose (for database services)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Space-LEAF-corp/turbo_stack-.git
cd turbo_stack-
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Copy example env files
cp apps/api/.env.example apps/api/.env
cp packages/database/.env.example packages/database/.env
```

4. **Start Docker services** (PostgreSQL & Redis)

```bash
docker-compose up -d
```

5. **Run database migrations**

```bash
cd packages/database
npx prisma migrate dev
npx prisma generate
cd ../..
```

### Running the Application

**Development mode** (runs all apps in parallel):

```bash
npm run dev
```

This will start:
- Frontend (Next.js): http://localhost:3000
- Backend API: http://localhost:3001

**Build for production**:

```bash
npm run build
```

**Start production build**:

```bash
npm run start
```

### Individual App Commands

**Frontend (Web)**:
```bash
cd apps/web
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
```

**Backend (API)**:
```bash
cd apps/api
npm run dev      # Start dev server with hot reload
npm run build    # Compile TypeScript
npm run start    # Start production server
```

## 🧪 Available Scripts

- `npm run dev` - Run all apps in development mode
- `npm run build` - Build all apps
- `npm run start` - Start all apps in production mode
- `npm run lint` - Lint all apps
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean all build artifacts and node_modules

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

## 🐳 Docker

**Start services**:
```bash
docker-compose up -d
```

**Stop services**:
```bash
docker-compose down
```

**View logs**:
```bash
docker-compose logs -f
```

## ☸️ Kubernetes Deployment

Deploy to Minikube with Helm charts:

```bash
# Install tools (if needed)
./install-k8s-tools.sh

# Deploy everything
./deploy-minikube.sh

# Or follow detailed guide
# See KUBERNETES_DEPLOY.md
```

**Helm Charts Included:**
- `helm/frontend/` - Next.js frontend deployment
- `helm/backend/` - Express API backend deployment

**Features:**
- 🎭 2 replicas per service for high availability
- 📊 Health checks and readiness probes
- 🌐 NodePort services (frontend: 30000, backend: 30001)
- 🔄 Auto-scaling ready
- 📈 Resource limits and requests

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

## 🌟 Features to Build

This learning system is designed to:
- Track student progress across multiple courses
- Provide gentle, encouraging feedback
- Adapt to individual learning speeds
- Celebrate achievements and milestones
- Create a safe, joyful learning environment
