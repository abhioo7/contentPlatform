import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const story = await prisma.story.findUnique({
    where: { id },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
          industry: true,
          headquarters: true,
        },
      },
    },
  });

  if (!story) {
    return NextResponse.json({ error: "Story not found" }, { status: 404 });
  }

  return NextResponse.json(story);
}
