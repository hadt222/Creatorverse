# Creatorverse

A React frontend for managing your favorite content creators (Twitch, YouTube, Instagram, TikTok, Mastodon, etc.) with full CRUD and Supabase.

## Features

- [x] Logical React component structure (components + pages)
- [x] Display at least five content creators on the homepage (when present in DB)
- [x] Each creator item shows: name, link to channel/page, short description
- [x] API calls use async/await (Supabase client)
- [x] Clicking a creator goes to their details page (name, url, description)
- [x] Each creator has a unique URL (`/creator/:id`)
- [x] Edit a creator (name, url, description)
- [x] Delete a creator
- [x] Add a new creator (name, url, description); new creator appears in the list
- [x] PicoCSS for styling
- [x] Creators displayed as cards (not a plain list)
- [x] Optional image URL shown on creator cards and detail page

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Supabase

1. Create a project at [Supabase](https://supabase.com).
2. In **Database** → **New table**, create a table named `creators` with:
   - **Enable Row Level Security**: off
   - **Enable Realtime**: on
   - Columns: `name` (text), `url` (text), `description` (text). Optional: add `image_url` (text) to show creator images on cards and detail pages.
3. In **Settings** → **API**, copy your **Project URL** and **anon public** API key.
4. In this repo, open `src/client.js` and replace:
   - `'insert your Project URL here'` with your Project URL
   - `'insert your Project API key here'` with your API key

### 3. Run the app

```bash
npm run dev
```

Open the URL shown (e.g. http://localhost:5173). Add creators via “Add a creator”; you need at least five in the database to satisfy the “display at least five” requirement.

## Tech stack

- **Vite** + **React**
- **React Router** (routes: `/`, `/creator/new`, `/creator/:id`, `/creator/:id/edit`)
- **Supabase** (database and client)
- **PicoCSS** (styling)

## Project structure

- `src/client.js` – Supabase client
- `src/components/CreatorCard.jsx` – Card for one creator (name, url, description, optional image)
- `src/pages/ShowCreators.jsx` – Home: list of all creators
- `src/pages/ViewCreator.jsx` – Single creator detail + Edit/Delete
- `src/pages/AddCreator.jsx` – Form to add a creator
- `src/pages/EditCreator.jsx` – Form to edit a creator + Delete

## Video walkthrough

*(Add a link or file to your GIF/Loom/YouTube walkthrough here for submission.)*
