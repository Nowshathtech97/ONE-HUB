#!/usr/bin/env node

/**
 * ONE Portal - Backup Script
 * Creates a comprehensive backup of the entire project
 */

const fs = require('fs');
const path = require('path');

const projectName = 'ONE-Portal-AI-Career-Mentor';
const backupDir = `./backup-${projectName}-${new Date().toISOString().split('T')[0]}`;

// Files to backup
const filesToBackup = [
  'package.json',
  'package-lock.json',
  'index.html',
  'vite.config.js',
  'tailwind.config.js',
  'postcss.config.js',
  'README.md',
  'src/main.jsx',
  'src/index.css',
  'src/App.jsx',
  'src/components/Button.jsx',
  'src/components/Icon.jsx',
  'src/components/Header.jsx',
  'src/components/Sidebar.jsx',
  'src/components/ChatInterface.jsx',
  'src/components/ResumeAnalyzer.jsx'
];

// Directories to backup
const dirsToBackup = [
  'src',
  'src/components'
];

function createBackup() {
  console.log('🚀 Starting ONE Portal backup...');
  
  // Create backup directory
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log(`📁 Created backup directory: ${backupDir}`);
  }

  // Create directory structure
  dirsToBackup.forEach(dir => {
    const backupPath = path.join(backupDir, dir);
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
      console.log(`📁 Created directory: ${backupPath}`);
    }
  });

  // Copy files
  filesToBackup.forEach(file => {
    if (fs.existsSync(file)) {
      const backupPath = path.join(backupDir, file);
      const backupDirPath = path.dirname(backupPath);
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(backupDirPath)) {
        fs.mkdirSync(backupDirPath, { recursive: true });
      }
      
      fs.copyFileSync(file, backupPath);
      console.log(`✅ Backed up: ${file}`);
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  });

  // Create backup info file
  const backupInfo = {
    projectName: 'ONE Portal - AI Career Mentor',
    version: '1.0.0',
    backupDate: new Date().toISOString(),
    description: 'Complete backup of ONE Portal AI Career Mentor application',
    features: [
      'AI Assistant Chat Interface',
      'Resume Analysis with ATS Scoring',
      'Course Management System',
      'Credit Points Management',
      'Certificate Management',
      'Engineering Department Guidance',
      'Progress Tracking',
      'Direct Course Application Links'
    ],
    technologies: [
      'React 18.2.0',
      'Vite 4.4.5',
      'Tailwind CSS 3.4.17',
      'Lucide React Icons',
      'Google Fonts (Inter & Poppins)'
    ],
    courseProviders: [
      'AICTE (All India Council for Technical Education)',
      'Naan Mudhalvan (Tamil Nadu Government)',
      'MNC Free Courses (Google, Microsoft, Amazon, IBM, Meta, Cisco)',
      'Tamil Nadu Government TNSDC Courses'
    ],
    engineeringDisciplines: [
      'Computer Science & Engineering',
      'Electronics & Communication',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical Engineering',
      'Chemical Engineering'
    ],
    filesBackedUp: filesToBackup.filter(file => fs.existsSync(file)),
    totalFiles: filesToBackup.filter(file => fs.existsSync(file)).length
  };

  fs.writeFileSync(
    path.join(backupDir, 'backup-info.json'),
    JSON.stringify(backupInfo, null, 2)
  );

  console.log('\n🎉 Backup completed successfully!');
  console.log(`📦 Backup location: ${backupDir}`);
  console.log(`📊 Total files backed up: ${backupInfo.totalFiles}`);
  console.log('\n📋 Backup includes:');
  console.log('   • Complete source code');
  console.log('   • Configuration files');
  console.log('   • Dependencies list');
  console.log('   • Documentation');
  console.log('   • Component files');
  console.log('   • Styling and assets');
  
  console.log('\n🚀 To restore:');
  console.log(`   1. Copy files from ${backupDir} to your project directory`);
  console.log('   2. Run: npm install');
  console.log('   3. Run: npm run dev');
  
  return backupDir;
}

// Run backup if called directly
if (require.main === module) {
  try {
    createBackup();
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

module.exports = { createBackup };
