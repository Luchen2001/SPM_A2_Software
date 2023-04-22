#!/usr/bin/env bash

# Install required packages for frontend
brew install node

# Set up React app
cd ./frontend
npm install
npm run build

# Install required packages for backend
cd ../backend
pip3 install fastapi
pip3 install uvicorn[standard]
