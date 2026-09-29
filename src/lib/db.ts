// Server-side database query helpers
// These must only be imported in Server Components or Route Handlers.

import { prisma } from "./prisma";
import type { StoryContent } from "@/types/story";

// ---------------------------------------------------------------------------
// Company helpers
// ---------------------------------------------------------------------------

export async function getCompanyById(id: string) {
  return prisma.company.findUnique({
    where: { id },
    include: {
      stories: {
        where: { published: true },
        orderBy: { publishedAt: "desc" },
      },
    },
  });
}

export async function getFeaturedCompanies(take = 4) {
  return prisma.company.findMany({
    take,
    orderBy: { createdAt: "asc" },
    include: {
      _count: { select: { stories: { where: { published: true } } } },
    },
  });
}

// ---------------------------------------------------------------------------
// Story helpers
// ---------------------------------------------------------------------------

export async function getStoryById(id: string) {
  return prisma.story.findUnique({
    where: { id },
    include: { company: true },
  });
}

export async function getLatestStories(take = 6) {
  return prisma.story.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take,
    include: { company: true },
  });
}

// ---------------------------------------------------------------------------
// Type guard for story content
// ---------------------------------------------------------------------------

export function parseStoryContent(raw: unknown): StoryContent | null {
  if (
    raw === null ||
    typeof raw !== "object" ||
    Array.isArray(raw)
  ) {
    return null;
  }

  const obj = raw as Record<string, unknown>;

  if (obj.version !== 1 || !Array.isArray(obj.blocks)) {
    return null;
  }

  return raw as StoryContent;
}
