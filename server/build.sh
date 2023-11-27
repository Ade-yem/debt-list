#!/bin/bash

echo "Building..."

# Install TypeScript locally (assuming it's listed in your package.json)
npm install --save-dev typescript

# Run TypeScript compilation
npx tsc -p .

echo "Build complete."
