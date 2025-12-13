# Quick Start Commands

# Install Prerequisites
brew install minikube helm kubectl

# Deploy Everything
./deploy-minikube.sh

# Or Manual Steps:
minikube start --driver=docker --cpus=4 --memory=4096
eval $(minikube docker-env)
docker build -t turbo-stack-frontend:latest -f apps/web/Dockerfile .
docker build -t turbo-stack-backend:latest -f apps/api/Dockerfile .
helm install backend ./helm/backend
helm install frontend ./helm/frontend

# Access Services
minikube service frontend --url
minikube service backend --url

# Watch Pods Dance
minikube dashboard
kubectl get pods -w

# Cleanup
helm uninstall frontend backend
minikube stop
