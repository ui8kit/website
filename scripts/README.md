# Documentation Sync Scripts

This set of scripts automates the synchronization of documentation between source files and published versions.

## 📁 Structure

- `packages/ui8kit-docs/` - **Source Files** (edit here - .md files)
- `apps/docs/ru/` - **Russian Version** (auto-generated .mdx files for Mintlify)
- `apps/docs/en/` - **English Version** (manually translated .mdx files for Mintlify)

## 🚀 Usage

### One-time Synchronization

```bash
npm run docs:sync
```

Synchronizes all files from `packages/ui8kit-docs/` to `apps/docs/ru/` and `apps/docs/en/`.

### Automatic Change Tracking

```bash
npm run docs:watch
```

Starts a watcher that automatically synchronizes files to RU version upon each save in `packages/ui8kit-docs/`.

### Commit RU Documentation

```bash
npm run docs:commit-ru
```

Commits all changes in `apps/docs/ru/` to track RU documentation updates.

## 📝 Workflow

1. **Edit files in `packages/ui8kit-docs/`**
   - Use standard `.md` files
   - Maintain folder structure

2. **Automatic Synchronization**
   - Files are automatically copied to `apps/docs/ru/` and `apps/docs/en/`
   - The extension changes from `.md` to `.mdx`

3. **Publication**
   - Mintlify reads MDX files from `apps/docs/ru/` and `apps/docs/en/`

## 🔧 Configuration

### Adding New Sections

1. Create a folder in `packages/ui8kit-docs/`
2. Add `.md` files
3. The script will automatically create corresponding folders in `apps/docs/`

### Translating to English

The English version is maintained manually through AI agent assistance:

1. Make changes in `packages/ui8kit-docs/`
2. Sync to RU version using `npm run docs:watch`
3. Show the changes to AI agent for translation
4. AI agent updates corresponding files in `apps/docs/en/`

## 🛠️ Scripts

### `sync-docs-watcher.js`

- Tracks changes in real-time
- Uses chokidar for efficient monitoring
- Syncs files to RU version only (does not affect EN version)
- Converts .md to .mdx extension

### `sync-docs-once.js`

- One-time synchronization of all files
- Useful for initial setup
- Force synchronization

### `commit-docs-ru.js`

- Automatically commits changes in `apps/docs/ru/`
- Creates commits with date stamps
- Useful for tracking RU documentation updates

## 📋 Dependencies

- `chokidar` - for tracking file changes
- Node.js with ES modules support

## 🔍 Troubleshooting

### Watcher not starting

```bash
npm install  # install dependencies
npm run docs:watch
```

### Files not synchronizing

1. Verify that files are in `packages/ui8kit-docs/`
2. Ensure the watcher is running (`npm run docs:watch`)
3. Try a one-time synchronization (`npm run docs:sync`)

### Folder structure not preserved

The script automatically creates the necessary folders in the target directories.
