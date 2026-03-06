# Swaramthala 🥁

**Swaramthala** is India's premium P2P marketplace for musical instruments. Buy, sell, rent, and trade gear with a community of verified musicians.

## 🚀 Key Features
- **Smart Search**: Find gear by category, condition, and location.
- **Musician KYC**: Trusted 'Verified Musician' badges for sellers.
- **Rental Support**: Flexible rental durations with automatic pricing.
- **Seller Dashboard**: Comprehensive analytics, earnings tracking, and order management.
- **Multilingual UI**: Optimized for the Indian market (English/Tamil).

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Prisma with SQLite
- **Styling**: Vanilla CSS / Glassmorphism
- **Icons**: Lucide React

## 🏁 Getting Started
1. Clone the repo: `git clone https://github.com/sivapradeep671-gif/pradeep`
2. Install dependencies: `npm install`
3. Push the schema: `npx prisma db push`
4. Run the seed: `npm run seed`
5. Start the server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) to start browsing gear.

## 📦 Deployment
This project is **Vercel-ready**.
1. Set up a PostgreSQL database (e.g., Supabase or Neon).
2. Push your code to GitHub.
3. Link the repository to Vercel.
4. Add the environment variables from `.env.example`.

### Pre-Launch Features Included:
- **SEO**: Dynamic `sitemap.ts` and `robots.txt`.
- **Analytics**: Vercel Analytics & Speed Insights integrated.
- **Legal**: Privacy Policy and Terms of Service included.
- **Infrastructure**: Ready-to-use scaffolds for **Resend** (Email) and **Stripe** (Payments).
