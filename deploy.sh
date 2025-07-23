#!/bin/bash

set -e  # Exit immediately if any command fails

echo "🔁 Starting deploy process..."

# Ensure you're in the correct directory
cd "$(dirname "$0")"

echo "📂 Switching to main branch..."
git fetch origin
git checkout main
git pull origin main

echo "🚀 Restarting services..."
./start.sh

echo "✅ Deploy complete!"
