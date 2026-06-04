# Tunic Decipher

A Next.js app for exploring and annotating the Tunic translation manual.

The app is deployed and accessible at: **https://tunic-decipher.vercel.app**

## What it does

- Displays Tunic manual pages side-by-side in a responsive viewer
- Lets you open a compact table of contents modal to toggle page visibility
- Marks unselected pages as missing placeholders so the layout stays consistent
- Supports keyboard navigation through page spreads using `A` and `D`
- Includes a rune translation test area for placeholder rune rendering

## How it works

- `src/app/page.tsx` contains the main UI, tab navigation, spread generation, and TOC modal
- `src/components/ManualPageEditor.tsx` renders each manual page and keeps a consistent page aspect ratio
- `src/lib/manualPages.tsx` stores page metadata, image URLs, and translation annotations
- `src/components/RuneGlyph.tsx` renders rune placeholder segments used by the translator view

## Running locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## App sections

- **Manual**: browse manual pages and open the TOC modal
- **Alphabet**: preview placeholder rune shapes
- **Translate**: enter English text and see placeholder rune translation output

## Notes

- The TOC is presented as a three-column modal with 18/18/16 pages to reduce scrolling
- Hidden or uncollected pages show a centered "MISSING MANUAL PAGE" placeholder
- The app uses Tailwind-style utility classes for layout and styling

## Deployment

This project is deployed with Vercel at the URL above.

If you need to redeploy, connect the repository to Vercel and use the standard Next.js deployment workflow.
