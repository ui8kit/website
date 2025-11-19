# Documentation Sync System

This system automates the synchronization of documentation between source files and published versions.

## 🎯 Overview

The system automatically synchronizes changes from `packages/ui8kit-docs/` to `apps/docs/ru/`, converting `.md` files to `.mdx`.

## 📁 Structure

```
packages/ui8kit-docs/     # 📝 Source Files (.md) - edit here
├── api-reference/
├── architecture/
├── development-guide/
├── overview.md
└── ...

apps/docs/ru/            # 🎯 RU Version (.mdx) - automatically generated
├── api-reference/
├── architecture/
├── development-guide/
├── overview.mdx
└── ...

apps/docs/en/            # 🔄 EN Version (.mdx) - manually translated
├── api-reference/
├── architecture/
├── development-guide/
└── ...
```

## 🚀 Commands

### Synchronization

```bash
# One-time synchronization of all files
npm run docs:sync

# Automatic change tracking (run in background)
npm run docs:watch

# Commit changes in RU documentation
npm run docs:commit-ru
```

### Changesets (optional)

```bash
# Add a changeset for documentation
npm run changeset:add

# Create a version based on changesets
npm run changeset:version

# Publish changes
npm run changeset:release
```

## 📝 Workflow

### 1. Edit Documentation

```bash
# Edit files in packages/ui8kit-docs/
code packages/ui8kit-docs/overview.md
```

### 2. Automatic Synchronization

```bash
# Start the watcher (in background)
npm run docs:watch

# Or perform a one-time synchronization
npm run docs:sync
```

### 3. Commit Changes

```bash
# Commit changes in RU documentation
npm run docs:commit-ru
```

### 4. English Translation

```bash
# Show changes to the AI agent for translation
# The agent will update files in apps/docs/en/
```

## 🔧 Configuration

### Watcher (scripts/sync-docs-watcher.js)

- Tracks changes in `packages/ui8kit-docs/**/*.md`
- Synchronizes only to `apps/docs/ru/` (does not affect EN)
- Converts `.md` to `.mdx`

### Commit Script (scripts/commit-docs-ru.js)

- Automatically commits all changes in `apps/docs/ru/`
- Creates a commit with date: `docs(ru): update documentation - YYYY-MM-DD`

## 📋 Dependencies

- `chokidar` - for tracking file changes
- `@changesets/cli` - for changesets management (optional)

## 🔍 Troubleshooting

### Watcher not starting

```bash
npm install
npm run docs:watch
```

### Files not synchronizing

```bash
# Verify that the watcher is running
npm run docs:watch

# Or try a one-time synchronization
npm run docs:sync
```

### Git issues

```bash
# Check status
git status apps/docs/ru/

# Commit manually
npm run docs:commit-ru
```

## 🎨 Future Improvements

- [ ] AI integration for automatic translation
- [ ] YAML frontmatter validation
- [ ] Link integrity check
- [ ] Automatic code formatting in examples
