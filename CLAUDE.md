# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Production build (outputs to dist/)
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

This is a React SPA for tracking NeetCode 150 progress with spaced repetition.

**Tech Stack**: React 19 + Vite 7 + Tailwind CSS + React Router

**Routing** (`src/App.jsx`):
- `/` - NeetCodeTracker (main problem tracker with spaced repetition)
- `/patterns` - Code pattern templates in multiple languages
- `/roadmap` - Interview preparation roadmap

**Data** (`src/data/`):
- `problems.json` - NeetCode 150 problem definitions
- `patterns.json` - Code templates with language variants (python, javascript, java, go)
- `interview-roadmap.json` - Interview prep content
- `dsa-mindmap.json` - DSA concept map

**Components** (`src/components/`):
- `ProblemTable` - Main problem list with review status
- `Filters` - Category/difficulty/due-today filtering
- `StatsCard` - Progress statistics display
- `ExportImportControls` - JSON backup/restore for progress

**State**: Progress stored in localStorage (`neetcode-progress` key). Structure per problem:
```js
{ solved: bool, solvedDate: string, reviews: bool[5], dates: {} }
```

**Spaced Repetition**: Reviews scheduled at 1, 3, 7, 14, 30 days after solving.
