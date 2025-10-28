# anytype

A minimal typing simulator game built with Next.js, featuring real-time WPM tracking, leaderboards, and shareable results.

## Features

- **30-second typing test** or complete the text to finish
- **Real-time WPM tracking** with live updates every 100ms
- **WPM history charts** showing performance over time
- **Race mode** with ghost cursor showing the top leaderboard entry
- **Keyboard sound effects** (toggleable) using Howler.js
- **Leaderboard** displaying top 10 players by WPM
- **User profiles** with best WPM, average WPM, and game history
- **Shareable results** with unique short URLs and OpenGraph images
- **Google OAuth** authentication via Better Auth
- **Dark/Light theme** support with system preference detection
- **Custom font** (CursorGothic) for enhanced typography

## Setup

### Prerequisites

- Node.js 20+
- PostgreSQL database
- pnpm (or npm/yarn)

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables in `.env.local`:

```env
DATABASE_URL="your-postgres-connection-string"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

3. Generate and run database migrations:

```bash
# Generate Better Auth schema (if needed)
npx @better-auth/cli generate

# Generate Drizzle migrations
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Or push schema directly (development)
pnpm db:push
```

4. Run the development server:

```bash
pnpm dev
```

Visit `http://localhost:3000` to start typing.

## Tech Stack

- **Next.js 16** (App Router) - React framework with server components
- **React 19** - UI library
- **TypeScript** - Type safety
- **Drizzle ORM** - Type-safe database queries
- **Better Auth** - Authentication with OAuth support
- **PostgreSQL** - Database (Neon)
- **Tailwind CSS 4** - Utility-first styling
- **Recharts** - Data visualization for WPM charts
- **Howler.js** - Audio engine for keyboard sounds
- **Sonner** - Toast notifications
- **Next Themes** - Theme management
- **Nanoid** - Short ID generation for shareable links

## Project Structure

```
├── app/
│   ├── actions/
│   │   └── share.ts              # Server action for saving shareable results
│   ├── api/
│   │   ├── auth/[...all]/        # Better Auth API routes
│   │   └── leaderboard/top/      # API endpoint for top player
│   ├── leaderboard/
│   │   ├── page.tsx              # Leaderboard page
│   │   └── opengraph-image.tsx   # OG image generation
│   ├── profile/
│   │   └── page.tsx              # User profile with stats
│   ├── s/[shortId]/
│   │   ├── page.tsx              # Shared result viewer
│   │   └── opengraph-image.tsx   # OG image for shared results
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Main game page
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── navigation.tsx            # Top navigation bar
│   ├── bottom-nav.tsx            # Bottom navigation
│   ├── typing-game.tsx           # Main game component
│   ├── wpm-chart.tsx             # WPM history chart
│   └── theme-provider.tsx          # Theme provider
├── lib/
│   ├── db/
│   │   ├── schema.ts             # Drizzle schema definitions
│   │   └── index.ts              # Database client
│   ├── auth.ts                   # Better Auth configuration
│   ├── auth-client.ts            # Client-side auth utilities
│   ├── auth-server.ts            # Server-side auth utilities
│   ├── excerpts.ts               # Text excerpts for typing practice
│   └── use-keyboard-sounds.ts    # Keyboard sound effects hook
└── drizzle.config.ts             # Drizzle configuration
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Apply migrations
- `pnpm db:push` - Push schema changes (dev only)
- `pnpm db:studio` - Open Drizzle Studio

## Key Features Explained

### Game Mechanics

- Timer starts when you type the first character
- Game ends after 30 seconds or when text is completed
- WPM calculated as: `(correct characters / 5) / minutes`
- Accuracy shown as percentage of correct characters

### Race Mode

- Enable the flag icon to see a ghost cursor showing the top leaderboard player's speed
- Helps visualize how you're performing relative to the best player

### Sharing Results

- Click "Share" after completing a game to get a unique short URL
- Shared links include WPM history charts if available
- OpenGraph images are automatically generated for social sharing

## Database Schema

- `user` - User accounts (Better Auth)
- `session` - User sessions (Better Auth)
- `gameResults` - Stored game results with WPM, accuracy, duration, and history
- `shareableResults` - Maps short IDs to game results
