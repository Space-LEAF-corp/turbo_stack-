# 🏗️ Kubernetes Architecture

## Deployment Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Minikube Cluster                        │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Frontend Deployment                    │    │
│  │  ┌──────────────┐    ┌──────────────┐              │    │
│  │  │  Frontend    │    │  Frontend    │              │    │
│  │  │   Pod 1      │    │   Pod 2      │              │    │
│  │  │  Next.js     │    │  Next.js     │              │    │
│  │  │  :3000       │    │  :3000       │              │    │
│  │  └──────────────┘    └──────────────┘              │    │
│  │           ▲                 ▲                       │    │
│  │           └─────────┬───────┘                       │    │
│  │                     │                               │    │
│  │              ┌──────┴───────┐                       │    │
│  │              │   Service    │                       │    │
│  │              │  frontend    │                       │    │
│  │              │  NodePort    │                       │    │
│  │              │  :30000      │                       │    │
│  │              └──────────────┘                       │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Backend Deployment                     │    │
│  │  ┌──────────────┐    ┌──────────────┐              │    │
│  │  │   Backend    │    │   Backend    │              │    │
│  │  │   Pod 1      │    │   Pod 2      │              │    │
│  │  │  Express     │    │  Express     │              │    │
│  │  │  :3001       │    │  :3001       │              │    │
│  │  └──────────────┘    └──────────────┘              │    │
│  │           ▲                 ▲                       │    │
│  │           └─────────┬───────┘                       │    │
│  │                     │                               │    │
│  │              ┌──────┴───────┐                       │    │
│  │              │   Service    │                       │    │
│  │              │   backend    │                       │    │
│  │              │  NodePort    │                       │    │
│  │              │  :30001      │                       │    │
│  │              └──────────────┘                       │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          ▲
                          │
                    Minikube Tunnel
                          │
                          ▼
                   ┌──────────────┐
                   │   Your Mac   │
                   │  localhost   │
                   └──────────────┘
```

## Resource Specifications

### Frontend Deployment
- **Replicas**: 2
- **Image**: `turbo-stack-frontend:latest`
- **Port**: 3000
- **CPU Limit**: 500m
- **Memory Limit**: 512Mi
- **Health Checks**: HTTP GET / on port 3000

### Backend Deployment
- **Replicas**: 2
- **Image**: `turbo-stack-backend:latest`
- **Port**: 3001
- **CPU Limit**: 500m
- **Memory Limit**: 512Mi
- **Health Checks**: HTTP GET /api/health on port 3001

## Service Exposure

### Frontend Service
- **Type**: NodePort
- **Port**: 3000
- **NodePort**: 30000
- **Access**: `minikube service frontend --url`

### Backend Service
- **Type**: NodePort
- **Port**: 3001
- **NodePort**: 30001
- **Access**: `minikube service backend --url`

## Helm Chart Structure

```
helm/
├── frontend/
│   ├── Chart.yaml              # Chart metadata
│   │   ├── name: frontend
│   │   ├── version: 0.1.0
│   │   └── appVersion: 0.1.0
│   │
│   ├── values.yaml             # Configuration values
│   │   ├── replicaCount: 2
│   │   ├── image settings
│   │   ├── service settings
│   │   ├── resource limits
│   │   └── environment variables
│   │
│   └── templates/
│       ├── deployment.yaml     # Kubernetes Deployment
│       │   ├── Pod spec
│       │   ├── Container spec
│       │   ├── Probes
│       │   └── Resources
│       │
│       └── service.yaml        # Kubernetes Service
│           ├── Service type
│           ├── Ports
│           └── Selectors
│
└── backend/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── deployment.yaml
        └── service.yaml
```

## Deployment Flow

```
1. Install Prerequisites
   └── minikube, helm, kubectl

2. Start Minikube
   └── minikube start

3. Build Images
   ├── Set Docker env: eval $(minikube docker-env)
   ├── Build frontend: docker build -t turbo-stack-frontend:latest
   └── Build backend: docker build -t turbo-stack-backend:latest

4. Deploy with Helm
   ├── helm install backend ./helm/backend
   └── helm install frontend ./helm/frontend

5. Verify Deployment
   ├── kubectl get pods
   ├── kubectl get services
   └── helm list

6. Access Applications
   ├── minikube service frontend --url
   └── minikube service backend --url

7. Monitor
   ├── minikube dashboard
   ├── kubectl get pods -w
   └── kubectl logs -f <pod-name>
```

## Pod Lifecycle

```
Pending → ContainerCreating → Running
           ↓                    ↓
    ImagePullBackOff      Ready (✓)
                              ↓
                         Terminating
```

## Service Discovery

Within the cluster, services communicate using DNS:
- Frontend can reach backend at: `http://backend:3001`
- Backend can reach frontend at: `http://frontend:3000`

## Scaling

```bash
# Scale frontend to 5 replicas
kubectl scale deployment frontend --replicas=5

# Scale backend to 3 replicas
helm upgrade backend ./helm/backend --set replicaCount=3

# Auto-scale based on CPU
kubectl autoscale deployment frontend --cpu-percent=50 --min=2 --max=10
```

## Health Checks

### Liveness Probe
- Checks if container is alive
- Restarts container if check fails
- Initial delay: 30s
- Period: 10s

### Readiness Probe
- Checks if container is ready to serve traffic
- Removes from service endpoints if check fails
- Initial delay: 10s
- Period: 5s

## Resource Management

```yaml
resources:
  requests:        # Guaranteed resources
    cpu: 250m
    memory: 256Mi
  limits:          # Maximum resources
    cpu: 500m
    memory: 512Mi
```

## Network Topology

```
┌─────────────────────────────────────────┐
│         Minikube Node (VM)              │
│                                         │
│  Pod Network (10.244.0.0/16)           │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ Frontend    │  │ Backend     │     │
│  │ 10.244.0.5  │  │ 10.244.0.6  │     │
│  └─────────────┘  └─────────────┘     │
│         │                │              │
│         └────────┬───────┘              │
│                  │                      │
│  ┌───────────────┴────────────────┐    │
│  │    Service Network             │    │
│  │    (ClusterIP + NodePort)      │    │
│  └────────────────────────────────┘    │
│                  │                      │
└──────────────────┼──────────────────────┘
                   │
            ┌──────┴──────┐
            │ Host Network│
            │ NodePort    │
            └─────────────┘
```

## Commands Reference

### View Resources
```bash
kubectl get all                    # All resources
kubectl get pods -o wide          # Pods with IPs
kubectl get svc                   # Services
kubectl get deployments           # Deployments
```

### Describe Resources
```bash
kubectl describe pod <name>       # Pod details
kubectl describe svc frontend     # Service details
kubectl describe deploy backend   # Deployment details
```

### Logs
```bash
kubectl logs <pod-name>           # Pod logs
kubectl logs -f <pod-name>        # Follow logs
kubectl logs -l app=frontend      # All frontend pods
```

### Helm
```bash
helm list                         # List releases
helm status frontend              # Release status
helm get values frontend          # Current values
helm upgrade frontend ./helm/frontend  # Upgrade
```

---

**Architecture designed for:** High Availability, Scalability, and Cloud-Native deployment
