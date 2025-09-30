# Tic-Tac-Toe Game

![App Preview](https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=300&fit=crop&auto=format)

A modern, interactive Tic-Tac-Toe game built with Next.js 15, React, and TypeScript. Features clean UI, smooth animations, and a persistent scoring system that tracks wins for both players.

## Features

- 🎮 Classic Tic-Tac-Toe gameplay
- 🏆 Persistent scoring system (X vs O)
- 🎨 Clean, modern UI with smooth animations
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 and React
- 🔵 Color-coded players (X: Blue, O: Red)
- ♻️ Quick game reset with score preservation
- 🔄 Optional score reset to start fresh
- ✨ Visual feedback for wins and draws

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d6e262e4b13704227fb9c0&clone_repository=68dbda5d1df94af144a25ee6)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "give me a website with games"

### Code Generation Prompt

> "Build a tic-tac-toe game in React with clean UI and game state management and a scoring system where it shows 0-0 and adds one to the winner."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 15](https://nextjs.org/) - React framework
- [React 18](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Cosmic](https://www.cosmicjs.com/docs) - Headless CMS (for future content integration)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A Cosmic account (for potential future content integration)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials (for future content features):

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Game Rules

1. Players take turns placing X or O on the 3x3 grid
2. First player to get three in a row (horizontal, vertical, or diagonal) wins
3. If all squares are filled with no winner, the game is a draw
4. Scores are tracked and persist across game resets
5. Use "Reset Game" to start a new round
6. Use "Reset Scores" to clear all scores and start fresh

## Cosmic CMS Integration

This game is built with Cosmic's infrastructure and can be extended with:
- Tournament brackets and leaderboards
- Player profiles and statistics
- Game history and replay features
- Multiplayer functionality
- Achievement systems

Learn more about [Cosmic's features](https://www.cosmicjs.com/docs).

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Environment Variables

Set these in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

<!-- README_END -->