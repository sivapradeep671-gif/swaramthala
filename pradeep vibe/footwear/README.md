# SOLEVA — Next-Gen Ecommerce Platform

SOLEVA is a modern, high-performance headless ecommerce platform built for the future of footwear retail.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Payments**: [Stripe](https://stripe.com/)
- **Rate Limiting**: [Upstash Redis](https://upstash.com/)
- **3D Rendering**: [Spline](https://spline.design/)

## 🛠️ Key Features

- **Blazing Fast Performance**: Statically generated (SSG) shop pages with instantaneous client-side filtering.
- **Robust SSR Auth**: Deeply integrated Supabase SSR authentication guarding both layouts and API routes.
- **Idempotent Webhooks**: Rock-solid Stripe webhook handlers that gracefully handle duplicate events.
- **Distributed Rate Limiting**: Upstash Redis protecting all API endpoints against abuse and DDoS.
- **Automated E2E Testing**: Comprehensive Playwright test suite validating all critical customer journeys.

## 📦 Getting Started

### Prerequisites
- Node.js 22+
- A Supabase Project
- A Stripe Account
- An Upstash Redis database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sivapradeep671-gif/swaramthala.git
   cd swaramthala
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the example environment file and fill in your keys.
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing

This project includes a robust Playwright E2E testing suite for critical user journeys.

```bash
# Run all E2E tests
npm run test:e2e

# Run tests in UI mode
npx playwright test --ui
```

## 🔐 Environment Architecture

The application strictly guards against production misconfigurations. 
- Local development automatically falls back to robust mock data if Supabase is unlinked.
- Production builds (Vercel) will intentionally throw errors if live database connections are not provided, preventing accidental live dummy-data exposure.

---
*Built with ❤️ and Next.js 16.*
