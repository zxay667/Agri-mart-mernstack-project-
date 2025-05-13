/*
This script helps set up the AgriMart application by:
1. Installing dependencies for both backend and frontend
2. Creating a sample .env file
3. Seeding the database with sample data

To run this script:
1. Make sure you have Node.js installed
2. Run: node setup.js
*/

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
  }
};

// Helper function to log with colors
const log = {
  info: (msg) => console.log(`${colors.fg.cyan}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.fg.green}${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.fg.yellow}${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.fg.red}${msg}${colors.reset}`),
  title: (msg) => console.log(`\n${colors.fg.magenta}${colors.bright}${msg}${colors.reset}\n`)
};

// Main setup function
async function setup() {
  log.title('AgriMart Setup');
  
  try {
    // Check if MongoDB is installed
    log.info('Checking if MongoDB is installed...');
    try {
      execSync('mongod --version', { stdio: 'ignore' });
      log.success('MongoDB is installed.');
    } catch (error) {
      log.warning('MongoDB is not installed or not in PATH.');
      log.warning('Please install MongoDB or use MongoDB Atlas for cloud database.');
    }
    
    // Install backend dependencies
    log.info('Installing backend dependencies...');
    process.chdir('./backend');
    execSync('npm install', { stdio: 'inherit' });
    log.success('Backend dependencies installed successfully.');
    
    // Create .env file if it doesn't exist
    if (!fs.existsSync('.env')) {
      log.info('Creating .env file...');
      const envContent = `NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/agrimart
JWT_SECRET=abc123
JWT_EXPIRE=30d`;
      fs.writeFileSync('.env', envContent);
      log.success('.env file created successfully.');
    } else {
      log.warning('.env file already exists. Skipping creation.');
    }
    
    // Install frontend dependencies
    log.info('Installing frontend dependencies...');
    process.chdir('../frontend');
    execSync('npm install', { stdio: 'inherit' });
    log.success('Frontend dependencies installed successfully.');
    
    // Return to root directory
    process.chdir('..');
    
    log.title('Setup Complete!');
    log.info('To start the application:');
    log.info('1. Start MongoDB service if using local MongoDB');
    log.info('2. Run "npm run dev" in the backend directory to start both backend and frontend');
    log.info('3. Or run "npm run server" for backend only and "npm run client" for frontend only');
    
  } catch (error) {
    log.error('An error occurred during setup:');
    console.error(error);
  }
}

// Run the setup
setup();
