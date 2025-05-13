#!/bin/bash

echo "Installing backend dependencies..."
cd functions
npm install express cors
cd ..

echo "Building React frontend..."
npm run build

echo "Deploying to Firebase..."
firebase deploy

echo "Deployment complete."
