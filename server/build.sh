echo "check node version"
node -v

echo "Building..."
echo "Installing TypeScript globally..."
npm install -g typescript

echo "Installing project dependencies..."
npm install

echo "Installing TypeScript type declarations..."
npm install --save-dev @types/express @types/mongoose @types/dotenv @types/cookie-parser @types/cors @types/node

echo "Running TypeScript build..."
tsc -p .

echo "Build complete."
