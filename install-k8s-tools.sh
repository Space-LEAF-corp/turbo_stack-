#!/bin/bash

# 🔧 Install Kubernetes Tools for macOS

echo "🚀 Installing Kubernetes tools..."
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew not found. Installing Homebrew first..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

echo "📦 Installing Minikube..."
brew install minikube

echo "⚓ Installing Helm..."
brew install helm

echo "☸️  Installing kubectl..."
brew install kubectl

echo ""
echo "✅ Installation complete!"
echo ""
echo "Verify installations:"
minikube version
helm version
kubectl version --client

echo ""
echo "🎯 Ready to deploy! Run: ./deploy-minikube.sh"
