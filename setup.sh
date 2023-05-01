#!/usr/bin/env bash

# Install required packages for frontend
brew install nodejs

# Set up React app
cd ./frontend
npm install
npm install react-router-dom
npm install @mui/material
npm run build



# Install required packages for backend
cd ../backend
pip3 install fastapi
pip3 install uvicorn[standard]
