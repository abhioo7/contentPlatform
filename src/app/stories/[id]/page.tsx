import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { getStoryById } from "@/lib/db";
import { parseStoryContent } from "@/lib/db";
import StoryRenderer from "@/components/StoryRenderer";
import StoryAlert from "@/components/StoryAlert";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const story = await getStoryById(id);
  if (!story) return { title: "Story Not Found" };
  return { title: story.title };
}

export default async function StoryPage({ params }: Props) {
  const { id } = await params;
  const story = await getStoryById(id);

  if (!story) {
    notFound();
  }

  const content = parseStoryContent(story.content);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <StoryAlert logoUrl={story.company.logoUrl} companyName={story.company.name} />
      {/* Back to company */}
      <Link
        href={`/companies/${story.company.id}`}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {story.company.name}
      </Link>

      {/* Company badge */}
      <Link
        href={`/companies/${story.company.id}`}
        className="flex items-center gap-4 mb-6 group"
      >
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 flex items-center justify-center">
          <img
            src={story.company.logoUrl}
            alt={`${story.company.name} logo`}
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {story.company.name}
          </p>
          <p className="text-xs text-gray-500">{story.company.industry}</p>
        </div>
      </Link>

      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {story.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          {story.published && story.publishedAt ? (
            <time
              dateTime={story.publishedAt.toISOString()}
              className="text-sm text-gray-500"
            >
              Published {format(new Date(story.publishedAt), "MMMM d, yyyy")}
            </time>
          ) : (
            <span className="inline-block text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-2.5 py-0.5">
              Draft
            </span>
          )}

          <span className="text-xs font-medium bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5">
            {story.company.headquarters}
          </span>
        </div>
      </header>

      <hr className="border-gray-200 mb-8" />

      {/* Story content */}
      {content ? (
        <StoryRenderer content={content} />
      ) : (
        <p className="text-gray-500 italic">
          This story&apos;s content could not be displayed.
        </p>
      )}

      {/* Footer — back to company */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-3">More from</p>
        <Link
          href={`/companies/${story.company.id}`}
          className="inline-flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
            <img
              src={story.company.logoUrl}
              alt={`${story.company.name} logo`}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {story.company.name} →
          </span>
        </Link>
      </div>
    </div>
  );
}
