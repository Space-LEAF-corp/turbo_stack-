# 🚀 Kubernetes Deployment with Helm & Minikube

Deploy your Turbo Stack full-stack application to Kubernetes using Helm charts and Minikube.

## 📋 Prerequisites

### 1. Install Minikube
```bash
# macOS
brew install minikube

# Or download directly
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

### 2. Install Helm
```bash
# macOS
brew install helm

# Or use the install script
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### 3. Install kubectl (if not already installed)
```bash
# macOS
brew install kubectl

# Or download directly
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

## 🎯 Quick Deploy (Automated)

Run the deployment script:

```bash
chmod +x deploy-minikube.sh
./deploy-minikube.sh
```

This will:
1. ✅ Start Minikube
2. 🐳 Build Docker images
3. ⚓ Deploy with Helm
4. 🌐 Expose services
5. 📊 Open dashboard (optional)

## 🔧 Manual Deployment (Step-by-Step)

### Step 1: Start Minikube

```bash
# Start Minikube with Docker driver
minikube start --driver=docker --cpus=4 --memory=4096

# Verify it's running
minikube status
```

### Step 2: Build Docker Images

Point Docker to Minikube's Docker daemon:

```bash
# Set Docker environment
eval $(minikube docker-env)

# Build frontend image
docker build -t turbo-stack-frontend:latest -f apps/web/Dockerfile .

# Build backend image
docker build -t turbo-stack-backend:latest -f apps/api/Dockerfile .

# Verify images
docker images | grep turbo-stack
```

### Step 3: Deploy with Helm

```bash
# Deploy backend
helm install backend ./helm/backend

# Deploy frontend
helm install frontend ./helm/frontend

# Check Helm releases
helm list
```

### Step 4: Verify Deployment

```bash
# Check pods
kubectl get pods

# Watch pods come up
kubectl get pods -w

# Check services
kubectl get services

# Check deployments
kubectl get deployments
```

### Step 5: Access the Application

```bash
# Get frontend URL
minikube service frontend --url

# Get backend URL
minikube service backend --url

# Or open directly in browser
minikube service frontend
minikube service backend
```

## 📊 Minikube Dashboard

Watch your pods dance in the Kubernetes dashboard:

```bash
# Open dashboard
minikube dashboard

# Or get URL without opening
minikube dashboard --url
```

The dashboard shows:
- 🎭 Pod status and health
- 📈 Resource usage (CPU/Memory)
- 🔄 Deployment scaling
- 📝 Logs and events
- 🔍 Service endpoints

## 🔍 Useful Commands

### Checking Status

```bash
# Get all resources
kubectl get all

# Watch pods in real-time
kubectl get pods -w

# Check pod details
kubectl describe pod <pod-name>

# View pod logs
kubectl logs <pod-name>

# Follow logs
kubectl logs -f <pod-name>

# Get service endpoints
kubectl get endpoints
```

### Scaling

```bash
# Scale frontend to 3 replicas
kubectl scale deployment frontend --replicas=3

# Or use Helm
helm upgrade frontend ./helm/frontend --set replicaCount=3

# Watch pods scale
kubectl get pods -w
```

### Debugging

```bash
# Execute into a pod
kubectl exec -it <pod-name> -- /bin/sh

# Check events
kubectl get events --sort-by=.metadata.creationTimestamp

# Check service endpoints
kubectl describe service frontend
kubectl describe service backend
```

### Port Forwarding (Alternative to NodePort)

```bash
# Forward frontend locally
kubectl port-forward service/frontend 3000:3000

# Forward backend locally
kubectl port-forward service/backend 3001:3001
```

## 🎨 Helm Chart Structure

```
helm/
├── frontend/
│   ├── Chart.yaml              # Chart metadata
│   ├── values.yaml             # Default configuration
│   └── templates/
│       ├── deployment.yaml     # Pod deployment
│       └── service.yaml        # Service exposure
└── backend/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── deployment.yaml
        └── service.yaml
```

## ⚙️ Configuration

### Customize Frontend

Edit `helm/frontend/values.yaml`:

```yaml
replicaCount: 3  # Scale to 3 pods

resources:
  limits:
    cpu: 1000m
    memory: 1Gi
```

Apply changes:

```bash
helm upgrade frontend ./helm/frontend
```

### Customize Backend

Edit `helm/backend/values.yaml`:

```yaml
replicaCount: 4  # Scale to 4 pods

env:
  - name: DATABASE_URL
    value: "postgresql://user:pass@db:5432/mydb"
```

Apply changes:

```bash
helm upgrade backend ./helm/backend
```

## 🧹 Cleanup

### Uninstall Applications

```bash
# Uninstall both apps
helm uninstall frontend backend

# Or individually
helm uninstall frontend
helm uninstall backend
```

### Stop Minikube

```bash
# Stop Minikube
minikube stop

# Delete Minikube cluster
minikube delete

# Remove all Minikube data
minikube delete --all --purge
```

## 🎯 Accessing Services

After deployment, your services are exposed on NodePorts:

- **Frontend**: http://localhost:30000 (via `minikube service frontend`)
- **Backend**: http://localhost:30001 (via `minikube service backend`)

### Get URLs automatically:

```bash
echo "Frontend: $(minikube service frontend --url)"
echo "Backend: $(minikube service backend --url)"
```

## 📈 Monitoring

### View Resource Usage

```bash
# Top pods
kubectl top pods

# Top nodes
kubectl top nodes

# Enable metrics server if needed
minikube addons enable metrics-server
```

### Watch Logs

```bash
# Tail all frontend pods
kubectl logs -f -l app=frontend

# Tail all backend pods
kubectl logs -f -l app=backend

# Stream logs from all pods
kubectl logs -f --all-containers=true -l app=frontend
```

## 🐛 Troubleshooting

### Pods not starting?

```bash
# Check pod status
kubectl get pods

# Describe failing pod
kubectl describe pod <pod-name>

# Check events
kubectl get events

# View logs
kubectl logs <pod-name>
```

### Image pull errors?

```bash
# Make sure you're using Minikube's Docker
eval $(minikube docker-env)

# Rebuild images
docker build -t turbo-stack-frontend:latest -f apps/web/Dockerfile .
docker build -t turbo-stack-backend:latest -f apps/api/Dockerfile .
```

### Service not accessible?

```bash
# Check service
kubectl get service frontend

# Check endpoints
kubectl get endpoints frontend

# Try port-forward instead
kubectl port-forward service/frontend 3000:3000
```

## 🎉 Next Steps

1. **Add PostgreSQL**: Deploy a PostgreSQL Helm chart
2. **Enable Ingress**: Set up ingress controller
3. **Add Monitoring**: Deploy Prometheus/Grafana
4. **CI/CD Pipeline**: Automate deployments
5. **Production Ready**: Add secrets, configmaps, persistent volumes

## 📚 Resources

- [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

---

**Ready to deploy?** Run `./deploy-minikube.sh` and watch your pods dance! 🎭
