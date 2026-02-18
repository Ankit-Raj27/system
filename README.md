# S-RANK Ascension Dashboard

A high-performance dashboard that connects directly to your Notion "Life OS" and ACHIEVE databases to measure your progress toward S-Rank.

## Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Charts:** Chart.js + React Chartjs 2
- **Database:** Notion API

## Setup Instructions

1. **Environment Variables:**
   The `.env.local` file is already created with your Notion API Key and Database IDs.

2. **Installation:**
   ```bash
   npm install
   ```

3. **Development:**
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:3000`.

4. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

## Folder Structure
- `src/app/`: Core routing and pages.
- `src/components/`: Reusable UI components (Charts, Tables, Cards).
- `src/lib/`: Logic for fetching data from Notion.
- `.env.local`: Private configuration.

---
*Built for Switch by the System.*
