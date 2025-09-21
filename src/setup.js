#!/usr/bin/env node

/**
 * GlowUp Setup Script
 * This script helps set up the development environment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🌟 Setting up GlowUp development environment...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
    console.log('📝 Please edit .env file with your Supabase credentials\n');
  } else {
    console.log('❌ .env.example file not found');
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Check if required dependencies are installed
console.log('📦 Checking dependencies...');

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  const requiredDeps = [
    '@supabase/supabase-js',
    'react',
    'motion',
    'tailwindcss'
  ];

  const missingDeps = requiredDeps.filter(dep => 
    !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
  );

  if (missingDeps.length > 0) {
    console.log('❌ Missing dependencies:', missingDeps.join(', '));
    console.log('Run: npm install');
  } else {
    console.log('✅ All required dependencies are listed');
  }
} catch (error) {
  console.log('❌ Could not read package.json');
}

console.log('\n🚀 Setup complete! Next steps:');
console.log('1. Edit .env file with your Supabase credentials');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000');

console.log('\n📚 Need help? Check out:');
console.log('- README.md for detailed setup instructions');
console.log('- DEPLOYMENT.md for deployment guides');
console.log('- https://supabase.com for Supabase documentation');

console.log('\n✨ Happy coding with GlowUp!');