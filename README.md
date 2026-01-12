# OnlyBees — Frontend Assignment

Live demo: https://onlybees-frontend.vercel.app/

## Overview

OnlyBees is a modern frontend built with Next.js. This repository contains the frontend for the OnlyBees assignment, including pages for events and ticket checkout flows.

## Quick start

Prerequisites:

- Node.js (16+ recommended)
- npm (or use a compatible package manager)

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

## Project structure

- `app/` — Next.js app directory (pages, components, API routes)
- `public/` — static assets
- `components/` — reusable React components and UI building blocks
- `tickets/` — ticketing and checkout pages

## AI-assisted work

This project used AI to accelerate initial development and content structuring:

1. Project bootstrapping — reduced boilerplate and assisted with font/tailwind setup.
2. Content structuring — converted static tabbed content (About, Terms & Conditions, FAQ) into a structured `TabsData.js` for easier rendering.
3. UI scaffolding — provided an initial footer component structure.
4. Page skeletons — created base layouts for Tickets and Checkout pages that were refined manually.
5. General — VSCode tabbed completions were used thoughout this project as well as general help understanding tailwind-config changes introduced in ~v4.
6. Documentation — helped draft this README.