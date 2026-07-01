This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



Welcome to Chef Troll, the most unforgiving, hilarious, and addictive cooking game on the web. Do you have what it takes to impress our resident Chef Troll, or will you be sent packing to wash the dishes?

Game Overview:
Chef Troll is a web-based game where cooking isn't just about the food—it’s about surviving the Chef's sarcasm. With 20 levels of escalating culinary chaos and a "Free Cooking" sandbox mode, your skills will be tested, mocked, and hopefully rewarded.

Key Features:
20 Challenging Levels: Each level gets harder, requiring precise ingredient selection.

The "Troll" Factor: Make too many mistakes, and the Chef won't hesitate to roast your cooking skills.

Free Cooking Sandbox: Experiment with 100+ ingredients and see if your creation is "Perfect" or "So Bad."

Persistent Progress: Sign up to save your high scores and resume your culinary journey.

Responsive UI: Built with React, Next.js, and Tailwind CSS for a sleek, interactive experience.

Tech Stack:
Frontend: Next.js (App Router), React, Tailwind CSS

Backend/Database: Supabase (Auth & Postgres)

Deployment: Vercel

Development Roadmap:
Phase 1: Foundation

Setup Next.js + Tailwind environment.

Initialize Supabase project and database schema.

Implement basic Auth (Login/Signup/Guest).

Phase 2: Core Mechanics

Build the "Level Gameplay" component (Ingredient selector, penalty system).

Create the "Chef Troll" reaction engine (Emoji/Sticker system).

Phase 3: Sandbox & Polish

Develop the Free Cooking Mode logic.

Add animations (Framer Motion) for a professional, playful UI.

Level 20 celebration logic.

Phase 4: Deployment

Connect to GitHub and Vercel.

Configure environment variables for production.


Bash:
npm install

Configure Environment Variables:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Bash:
npm run dev
