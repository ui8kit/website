#!/usr/bin/env node

/**
 * One-time Documentation Sync
 * Syncs all files from packages/ui8kit-docs/ to apps/docs/ru/ and apps/docs/en/
 * Useful for initial setup or forced sync
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_DIR = path.join(__dirname, '..', 'packages', 'ui8kit-docs');
const RU_DEST_DIR = path.join(__dirname, '..', 'apps', 'docs', 'ru');
const EN_DEST_DIR = path.join(__dirname, '..', 'apps', 'docs', 'en');

console.log('🔄 Starting one-time documentation sync...');
console.log(`Source: ${SOURCE_DIR}`);
console.log(`RU Target: ${RU_DEST_DIR}`);
console.log(`EN Target: ${EN_DEST_DIR}\n`);

/**
 * Recursively get all markdown files from source directory
 */
function getMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Source directory not found: ${dir}`);
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Sync a single file to both destinations
 */
function syncFile(sourcePath) {
  const relativePath = path.relative(SOURCE_DIR, sourcePath);
  const ruDestPath = path.join(RU_DEST_DIR, relativePath.replace('.md', '.mdx'));
  const enDestPath = path.join(EN_DEST_DIR, relativePath.replace('.md', '.mdx'));

  try {
    // Read source content
    const content = fs.readFileSync(sourcePath, 'utf8');

    // Ensure destination directories exist
    ensureDirectoryExists(path.dirname(ruDestPath));
    ensureDirectoryExists(path.dirname(enDestPath));

    // Write to destinations
    fs.writeFileSync(ruDestPath, content, 'utf8');
    fs.writeFileSync(enDestPath, content, 'utf8');

    console.log(`✅ Synced: ${relativePath}`);
  } catch (error) {
    console.error(`❌ Failed to sync ${relativePath}:`, error.message);
  }
}

/**
 * Ensure directory exists, create if not
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Main execution
const markdownFiles = getMarkdownFiles(SOURCE_DIR);

if (markdownFiles.length === 0) {
  console.log('⚠️  No markdown files found in source directory');
  process.exit(0);
}

console.log(`📁 Found ${markdownFiles.length} markdown files to sync\n`);

markdownFiles.forEach(syncFile);

console.log(`\n🎉 Sync completed! ${markdownFiles.length} files processed.`);
