#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🚀 Preparing for Netlify deployment...');

// Check if dist folder exists
if (!fs.existsSync('dist')) {
  console.error('❌ dist folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Check if index.html exists in dist
if (!fs.existsSync('dist/index.html')) {
  console.error('❌ index.html not found in dist folder.');
  process.exit(1);
}

// Check if _redirects exists in dist
if (!fs.existsSync('dist/_redirects')) {
  console.error('❌ _redirects file not found in dist folder.');
  process.exit(1);
}

console.log('✅ Build files are ready!');
console.log('📁 Deploy the "dist" folder to Netlify');
console.log('');
console.log('🌐 Go to: https://app.netlify.com/drop');
console.log('📂 Drag and drop the "dist" folder');
console.log('');
console.log('🎉 Your site will be live in seconds!');
