#!/usr/bin/env node

/**
 * Documentation Sync Watcher
 * Watches for changes in packages/ui8kit-docs/ and syncs to apps/docs/ru/ and apps/docs/en/
 * Converts .md files to .mdx format while preserving YAML frontmatter
 */

import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_DIR = path.join(__dirname, '..', 'packages', 'ui8kit-docs');
const RU_DEST_DIR = path.join(__dirname, '..', 'apps', 'docs', 'ru');

console.log('📝 Documentation Sync Watcher Started');
console.log(`Watching: ${SOURCE_DIR}`);
console.log(`RU Target: ${RU_DEST_DIR}`);
console.log('Press Ctrl+C to stop...\n');

// Initialize watcher
const watcher = chokidar.watch(`${SOURCE_DIR}/**/*.md`, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300, // wait 300ms after last change
    pollInterval: 100
  }
});

// Handle file changes
watcher.on('change', (filePath) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] 📝 File changed: ${path.relative(SOURCE_DIR, filePath)}`);

  try {
    syncFile(filePath);
    console.log(`[${timestamp}] ✅ Synced successfully`);
  } catch (error) {
    console.error(`[${timestamp}] ❌ Sync failed:`, error.message);
  }
});

watcher.on('add', (filePath) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ➕ New file: ${path.relative(SOURCE_DIR, filePath)}`);

  try {
    syncFile(filePath);
    console.log(`[${timestamp}] ✅ Initial sync completed`);
  } catch (error) {
    console.error(`[${timestamp}] ❌ Initial sync failed:`, error.message);
  }
});

// Handle errors
watcher.on('error', (error) => {
  console.error('❌ Watcher error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping documentation sync watcher...');
  watcher.close();
  process.exit(0);
});

/**
 * Sync a single file to RU destination only
 */
function syncFile(sourcePath) {
  const relativePath = path.relative(SOURCE_DIR, sourcePath);
  const ruDestPath = path.join(RU_DEST_DIR, relativePath.replace('.md', '.mdx'));

  // Read source content
  const content = fs.readFileSync(sourcePath, 'utf8');

    // Ensure destination directory exists
    ensureDirectoryExists(path.dirname(ruDestPath));

  // Write to RU destination
  fs.writeFileSync(ruDestPath, content, 'utf8');
}

/**
 * Ensure directory exists, create if not
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Export for potential use as module
export {
  SOURCE_DIR,
  RU_DEST_DIR,
  syncFile
};
