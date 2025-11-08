#!/usr/bin/env node

/**
 * Script to generate llms-full.txt
 * Concatenates all markdown files from docs/ directory into a single file
 * for use as LLM context
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = path.join(__dirname, 'apps/docs/en');
const OUTPUT_FILE = path.join(__dirname, 'llms-full.txt');
const EXCLUDE_DIRS = ['.git', 'node_modules'];

/**
 * Recursively get all markdown files from a directory
 */
function getMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Skip excluded directories
    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        getMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Sort files in logical order
 */
function sortFiles(files) {
  const order = {
    'README.mdx': 0,
    '01-overview': 1,
    '02-getting-started': 2,
    '03-architecture': 3,
    '04-api-reference': 4,
    '05-development-guide': 5,
    '06-troubleshooting': 6,
  };

  return files.sort((a, b) => {
    const aOrder = Object.keys(order).find(key => a.includes(key)) || 'z';
    const bOrder = Object.keys(order).find(key => b.includes(key)) || 'z';
    
    return (order[aOrder] || 999) - (order[bOrder] || 999);
  });
}

/**
 * Generate the LLM context file
 */
function generateLLMContext() {
  console.log('📄 Generating LLM context file...\n');

  try {
    // Get all markdown files
    let mdFiles = getMarkdownFiles(DOCS_DIR);
    mdFiles = sortFiles(mdFiles);

    console.log(`Found ${mdFiles.length} markdown files:`);
    mdFiles.forEach(file => {
      console.log(`  ✓ ${path.relative(DOCS_DIR, file)}`);
    });

    // Generate content
    let content = '';
    content += '# UI8Kit/Core - Complete Documentation for LLM Context\n';
    content += '# ================================================================================\n';
    content += `# Generated: ${new Date().toISOString()}\n`;
    content += `# Total Files: ${mdFiles.length}\n`;
    content += '# ================================================================================\n\n';

    // Add table of contents
    content += '## TABLE OF CONTENTS\n\n';
    mdFiles.forEach((file, index) => {
      const relativePath = path.relative(DOCS_DIR, file);
      const title = path.basename(file, '.mdx');
      content += `${index + 1}. ${relativePath}\n`;
    });
    content += '\n';
    content += '# ================================================================================\n';
    content += '# DOCUMENTATION CONTENT\n';
    content += '# ================================================================================\n\n';

    // Add all markdown content
    mdFiles.forEach((file, index) => {
      const relativePath = path.relative(DOCS_DIR, file);
      const fileContent = fs.readFileSync(file, 'utf8');

      content += `# FILE ${index + 1}: ${relativePath}\n`;
      content += '# ================================================================================\n';
      content += fileContent;
      content += '\n\n';
      content += '# ================================================================================\n\n';
    });

    // Write to output file
    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');

    // Calculate file size
    const stats = fs.statSync(OUTPUT_FILE);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`\n✅ Successfully generated ${OUTPUT_FILE}`);
    console.log(`📊 File size: ${sizeMB} MB (${stats.size.toLocaleString()} bytes)`);
    console.log('\n💡 Usage: Use llms-full.txt for LLM context in tools like:');
    console.log('   - Cursor/VSCode with Claude');
    console.log('   - ChatGPT with file upload');
    console.log('   - Other LLM context windows\n');

  } catch (error) {
    console.error('❌ Error generating LLM context file:', error);
    process.exit(1);
  }
}

// Run the script
generateLLMContext();
