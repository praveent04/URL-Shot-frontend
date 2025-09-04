#!/usr/bin/env node

// Load environment variables from root .env file (if it exists)
try {
  require('dotenv').config({ path: './.env' });
  console.log('Loaded environment variables from root .env file');
} catch (error) {
  console.log('No .env file found, using system environment variables (normal for production)');
}

// Set PORT from FRONTEND_PORT if available
if (process.env.FRONTEND_PORT) {
  process.env.PORT = process.env.FRONTEND_PORT;
}

// Start the React development server
const { spawn } = require('child_process');
const path = require('path');

// Use the local react-scripts binary
const reactScripts = path.join('node_modules', '.bin', 'react-scripts');

const child = spawn(reactScripts, ['start'], {
  stdio: 'inherit',
  env: { ...process.env },
  shell: true // Needed for Windows compatibility
});

child.on('close', (code) => {
  process.exit(code);
});