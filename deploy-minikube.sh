#!/bin/bash

# 🚀 Turbo Stack Minikube Deployment Script
# Deploy your full-stack app to Kubernetes with Helm!

set -e

echo "🎯 Turbo Stack - Minikube Deployment"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Minikube is installed
if ! command -v minikube &> /dev/null; then
    echo -e "${YELLOW}⚠️  Minikube not found!${NC}"
    echo "Install Minikube: https://minikube.sigs.k8s.io/docs/start/"
    exit 1
fi

# Check if Helm is installed
if ! command -v helm &> /dev/null; then
    echo -e "${YELLOW}⚠️  Helm not found!${NC}"
    echo "Install Helm: https://helm.sh/docs/intro/install/"
    exit 1
fi

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo -e "${YELLOW}⚠️  kubectl not found!${NC}"
    echo "Install kubectl: https://kubernetes.io/docs/tasks/tools/"
    exit 1
fi

echo -e "${BLUE}📦 Step 1: Starting Minikube...${NC}"
if minikube status &> /dev/null; then
    echo "✅ Minikube is already running"
else
    echo "Starting Minikube with Docker driver..."
    minikube start --driver=docker --cpus=4 --memory=4096
fi

echo ""
echo -e "${BLUE}🐳 Step 2: Building Docker images in Minikube...${NC}"
echo "Setting Docker environment to use Minikube's Docker daemon..."
eval $(minikube docker-env)

echo "Building frontend image..."
docker build -t turbo-stack-frontend:latest -f apps/web/Dockerfile .

echo "Building backend image..."
docker build -t turbo-stack-backend:latest -f apps/api/Dockerfile .

echo "✅ Docker images built successfully"

echo ""
echo -e "${BLUE}⚓ Step 3: Deploying with Helm...${NC}"

# Uninstall existing releases (if any)
helm uninstall backend 2>/dev/null || true
helm uninstall frontend 2>/dev/null || true

sleep 2

# Install backend first
echo "Installing backend..."
helm install backend ./helm/backend

# Wait for backend to be ready
echo "Waiting for backend pods to be ready..."
kubectl wait --for=condition=ready pod -l app=backend --timeout=120s

# Install frontend
echo "Installing frontend..."
helm install frontend ./helm/frontend

# Wait for frontend to be ready
echo "Waiting for frontend pods to be ready..."
kubectl wait --for=condition=ready pod -l app=frontend --timeout=120s

echo ""
echo -e "${GREEN}✅ Deployment successful!${NC}"
echo ""

echo -e "${BLUE}🔍 Step 4: Checking deployment status...${NC}"
kubectl get pods
echo ""
kubectl get services
echo ""

echo -e "${BLUE}🌐 Step 5: Getting service URLs...${NC}"
FRONTEND_URL=$(minikube service frontend --url)
BACKEND_URL=$(minikube service backend --url)

echo ""
echo -e "${GREEN}🎉 Your app is live!${NC}"
echo "================================"
echo -e "Frontend: ${GREEN}$FRONTEND_URL${NC}"
echo -e "Backend:  ${GREEN}$BACKEND_URL${NC}"
echo ""
echo -e "${BLUE}📊 Open Minikube Dashboard:${NC}"
echo "  minikube dashboard"
echo ""
echo -e "${BLUE}🔧 Useful commands:${NC}"
echo "  kubectl get pods              # Check pod status"
echo "  kubectl get services          # Check services"
echo "  kubectl logs <pod-name>       # View pod logs"
echo "  helm list                     # List Helm releases"
echo "  kubectl describe pod <name>   # Pod details"
echo ""
echo -e "${YELLOW}🎭 Watch your pods dance:${NC}"
echo "  kubectl get pods -w"
echo ""
echo -e "${BLUE}🧹 To uninstall:${NC}"
echo "  helm uninstall frontend backend"
echo "  minikube stop"
echo ""

# Open dashboard (optional)
read -p "Open Minikube dashboard now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    minikube dashboard
fi
