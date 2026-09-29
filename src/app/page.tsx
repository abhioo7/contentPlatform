import type { Metadata } from "next";
import { getFeaturedCompanies, getLatestStories } from "@/lib/db";
import CompanyCard from "@/components/CompanyCard";
import StoryCard from "@/components/StoryCard";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Content Platform",
};

export default async function HomePage() {
  const [companies, stories] = await Promise.all([
    getFeaturedCompanies(4),
    getLatestStories(6),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 mb-4">
              Content Platform
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Stories from the world&apos;s most{" "}
              <span className="text-indigo-600">innovative companies</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600">
              Explore in-depth company profiles and curated stories from
              Microsoft, Tesla, Apple, Nvidia, and more — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#companies"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Browse Companies
              </a>
              <a
                href="#stories"
                className="inline-flex items-center px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Latest Stories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section
        id="companies"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Companies
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Leading organisations shaping the future
            </p>
          </div>
        </div>

        {companies.length === 0 ? (
          <EmptyState
            title="No companies yet"
            description="Run the seed script to populate the database with sample companies."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                id={company.id}
                name={company.name}
                logoUrl={company.logoUrl}
                industry={company.industry}
                headquarters={company.headquarters}
                summary={company.summary}
                publishedStoryCount={company._count.stories}
              />
            ))}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100 max-w-7xl mx-auto" />

      {/* Stories */}
      <section
        id="stories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest Stories</h2>
          <p className="mt-1 text-sm text-gray-500">
            Fresh insights, product news, and deep dives
          </p>
        </div>

        {stories.length === 0 ? (
          <EmptyState
            title="No published stories yet"
            description="Run the seed script to populate the database with sample stories."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                publishedAt={story.publishedAt}
                company={{
                  id: story.company.id,
                  name: story.company.name,
                  logoUrl: story.company.logoUrl,
                  industry: story.company.industry,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
