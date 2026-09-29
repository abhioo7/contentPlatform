# Content Platform

A production-quality full-stack content management platform for managing and displaying **Company Profiles** and **Stories**. Built as a senior-level take-home demonstration project.

---

## Overview

Content Platform lets you:

- Browse company profiles (Microsoft, Tesla, Apple, Nvidia) with metrics and published story feeds
- Read structured stories rendered safely from a JSON format — no arbitrary HTML
- Create companies and stories via a typed REST API
- View skeleton loading states, graceful 404 pages, and user-friendly error boundaries throughout

---

## Tech Stack

| Layer           | Technology                                       |
| --------------- | ------------------------------------------------ |
| Framework       | [Next.js 16](https://nextjs.org) with App Router |
| Language        | TypeScript (strict mode)                         |
| Database        | PostgreSQL 16 (via Docker)                       |
| ORM             | [Prisma 5](https://www.prisma.io)                |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com)       |
| Validation      | [Zod 3](https://zod.dev)                         |
| Date formatting | [date-fns](https://date-fns.org)                 |

---

## Architecture

```
Browser
  │
  ▼
Next.js App Router
  ├── Server Components  ──► src/lib/db.ts ──► Prisma Client ──► PostgreSQL
  │     (pages: /, /companies/[id], /stories/[id])
  │
  └── Route Handlers (API)
        ├── GET  /api/companies/[id]
        ├── POST /api/companies
        ├── GET  /api/stories/[id]
        └── POST /api/stories
```

- **Server Components** fetch data directly from the database without a network round-trip.
- **Route Handlers** expose a JSON REST API validated with Zod.
- **Prisma** generates a fully-typed client from `prisma/schema.prisma`.
- Story content is stored as structured JSON (never raw HTML) and rendered by `StoryRenderer` into semantic React elements — eliminating XSS risk entirely.

---

## Local Setup

### Prerequisites

- Node.js ≥ 20.9.0
- Docker Desktop

### 1. Clone the repository

```bash
git clone <repo-url>
cd content-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

The default `.env` connects to the Docker PostgreSQL instance. No changes are needed for local development.

### 4. Start Docker PostgreSQL

```bash
docker compose up -d
```

Starts PostgreSQL 16 on port 5432 with database `content_platform`.

### 5. Run Prisma migration

```bash
npm run db:migrate
```

This creates all tables and indexes defined in `prisma/schema.prisma`.

### 6. Seed the database

```bash
npm run db:seed
```

Inserts 4 companies (Microsoft, Tesla, Apple, Nvidia) and 8 stories.

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable       | Description                  | Default                                                          |
| -------------- | ---------------------------- | ---------------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/content_platform` |

---

## Package Scripts

| Script                      | Description                        |
| --------------------------- | ---------------------------------- |
| `npm run dev`               | Start Next.js development server   |
| `npm run build`             | Build for production               |
| `npm run start`             | Start production server            |
| `npm run lint`              | Run ESLint                         |
| `npm run db:migrate`        | Run Prisma migrations (dev)        |
| `npm run db:migrate:deploy` | Run Prisma migrations (production) |
| `npm run db:seed`           | Seed the database                  |
| `npm run db:studio`         | Open Prisma Studio                 |
| `npm run db:generate`       | Regenerate Prisma client           |

---

## API Documentation

All API responses use consistent JSON. Errors follow:

```json
{ "error": "Human readable message" }
```

Validation errors include field-level details:

```json
{
  "error": "Validation failed",
  "details": { "title": ["Title is required"] }
}
```

---

### `GET /api/companies/[id]`

Returns a company and its published stories ordered by newest first.

**Response 200**

```json
{
  "id": "clxxx",
  "name": "Microsoft",
  "logoUrl": "https://...",
  "industry": "Technology",
  "summary": "...",
  "employeeCount": 221000,
  "foundedYear": 1975,
  "websiteUrl": "https://www.microsoft.com",
  "headquarters": "Redmond, Washington, USA",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "stories": [
    {
      "id": "clyyy",
      "title": "Azure reaches 1 million customers",
      "publishedAt": "2025-03-10T00:00:00.000Z",
      "createdAt": "2025-03-10T00:00:00.000Z"
    }
  ]
}
```

**Errors:** `404` if company not found.

---

### `POST /api/companies`

Creates a new company.

**Request body**

```json
{
  "name": "Acme Corp",
  "logoUrl": "https://example.com/logo.png",
  "industry": "SaaS",
  "summary": "Acme makes everything.",
  "employeeCount": 5000,
  "foundedYear": 2005,
  "websiteUrl": "https://acme.com",
  "headquarters": "San Francisco, CA, USA"
}
```

**Responses:** `201` with created company · `400` validation error.

---

### `GET /api/stories/[id]`

Returns a story with full JSON content and company information.

**Response 200**

```json
{
  "id": "clyyy",
  "title": "Azure reaches 1 million customers",
  "content": {
    "version": 1,
    "blocks": [
      { "type": "heading", "level": 1, "text": "Azure..." },
      { "type": "paragraph", "text": "Microsoft Azure has crossed..." }
    ]
  },
  "published": true,
  "publishedAt": "2025-03-10T00:00:00.000Z",
  "companyId": "clxxx",
  "createdAt": "...",
  "updatedAt": "...",
  "company": {
    "id": "clxxx",
    "name": "Microsoft",
    "logoUrl": "https://...",
    "industry": "Technology",
    "headquarters": "Redmond, Washington, USA"
  }
}
```

**Errors:** `404` if story not found.

---

### `POST /api/stories`

Creates a new story.

**Request body**

```json
{
  "title": "My Story Title",
  "companyId": "clxxx",
  "content": {
    "version": 1,
    "blocks": [
      { "type": "heading", "level": 1, "text": "Introduction" },
      { "type": "paragraph", "text": "This is the first paragraph." },
      { "type": "list", "ordered": false, "items": ["Point one", "Point two"] },
      {
        "type": "image",
        "url": "https://images.unsplash.com/photo-xxx",
        "alt": "A descriptive caption"
      }
    ]
  }
}
```

**Responses:** `201` with created story · `400` validation error · `404` if `companyId` does not exist.

---

## Story JSON Format

Stories are stored as structured JSON — **never as raw HTML** — to eliminate XSS risk entirely.

### Schema

```typescript
interface StoryContent {
  version: 1;
  blocks: StoryBlock[];
}

type StoryBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt: string }
  | { type: "list"; ordered: boolean; items: string[] };
```

### Supported block types

| Block type              | Rendered as              |
| ----------------------- | ------------------------ |
| `heading` level 1       | `<h1>`                   |
| `heading` level 2       | `<h2>`                   |
| `heading` level 3       | `<h3>`                   |
| `paragraph`             | `<p>`                    |
| `image`                 | `<figure><img></figure>` |
| `list` (ordered: false) | `<ul><li>…</li></ul>`    |
| `list` (ordered: true)  | `<ol><li>…</li></ul>`    |

### JSON → HTML Rendering

`StoryRenderer` (`src/components/StoryRenderer.tsx`) converts the structured JSON to semantic React elements using a discriminated-union switch. It **never** calls `dangerouslySetInnerHTML`. Unknown block types are ignored silently. All text content is treated as plain text, not markup — React's default escaping ensures XSS is impossible.

---

## Database Design

### Models

**Company**

- `id` — cuid primary key
- `name`, `logoUrl`, `industry`, `summary`, `headquarters`, `websiteUrl`
- `employeeCount` (Int), `foundedYear` (Int)
- Indexes: `name`, `industry`

**Story**

- `id` — cuid primary key
- `title`, `content` (JSON/JSONB), `published` (Boolean), `publishedAt` (nullable DateTime)
- `companyId` — FK → Company (cascade delete)
- Indexes: `companyId`, `published`, `publishedAt`

**Relationship:** One Company → Many Stories. Deleting a Company cascades to its Stories.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── companies/
│   │   │   ├── route.ts          # POST /api/companies
│   │   │   └── [id]/route.ts     # GET  /api/companies/[id]
│   │   └── stories/
│   │       ├── route.ts          # POST /api/stories
│   │       └── [id]/route.ts     # GET  /api/stories/[id]
│   ├── companies/[id]/
│   │   ├── page.tsx              # Company detail (Server Component)
│   │   ├── loading.tsx           # Skeleton loading
│   │   ├── error.tsx             # Error boundary
│   │   └── not-found.tsx         # 404
│   ├── stories/[id]/
│   │   ├── page.tsx              # Story detail (Server Component)
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── layout.tsx                # Root layout with Header + Footer
│   ├── page.tsx                  # Homepage
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CompanyCard.tsx
│   ├── StoryCard.tsx
│   ├── StoryRenderer.tsx         # JSON → semantic React HTML
│   ├── CompanyMetrics.tsx
│   ├── LoadingSkeleton.tsx       # Skeleton UI variants
│   └── EmptyState.tsx
├── lib/
│   ├── prisma.ts                 # Singleton PrismaClient
│   ├── db.ts                     # Server-side query helpers
│   └── validations.ts            # Zod schemas (reusable)
└── types/
    └── story.ts                  # StoryBlock discriminated union types
prisma/
├── schema.prisma
├── migrations/
└── seed.ts
```

---

## Security Notes

- **No `dangerouslySetInnerHTML`** — story content is rendered via React elements only.
- **DATABASE_URL** is server-only; never imported in client components.
- **URL validation** in Zod schemas (`z.string().url()`) for `logoUrl`, `websiteUrl`, and image block URLs.
- **Untrusted JSON** from the database is narrowed through a `parseStoryContent` type guard before rendering.
- **No secrets** are committed. The `.env` file is gitignored; only `.env.example` is tracked.

---

## Possible Future Improvements

- Authentication & authorisation (NextAuth / Clerk)
- Pagination for story feeds
- Next.js Image CDN / optimised image pipeline
- Full-text search (PostgreSQL `tsvector` or Algolia)
- Rate limiting on API routes
- Rich content editor (Tiptap / BlockNote → outputs the same JSON format)
- Response caching with `next/cache` tags
- Observability (OpenTelemetry, Sentry)
