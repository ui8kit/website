#!/usr/bin/env node

/**
 * Commit RU Documentation Changes
 * Commits all changes in apps/docs/ru/ to track documentation updates
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RU_DOCS_DIR = path.join(__dirname, '..', 'apps', 'docs', 'ru');

try {
  // Check if there are any changes in RU docs
  const status = execSync('git status --porcelain apps/docs/ru/', { encoding: 'utf8' });

  if (!status.trim()) {
    console.log('✅ No changes in RU documentation to commit');
    process.exit(0);
  }

  console.log('📝 Found changes in RU documentation:');
  console.log(status);

  // Add RU docs to git
  execSync('git add apps/docs/ru/', { stdio: 'inherit' });

  // Create commit with current date
  const date = new Date().toISOString().split('T')[0];
  const commitMessage = `docs(ru): update documentation - ${date}`;

  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  console.log(`✅ Successfully committed RU documentation changes`);
  console.log(`Commit message: ${commitMessage}`);

} catch (error) {
  console.error('❌ Failed to commit RU documentation:', error.message);
  process.exit(1);
}
