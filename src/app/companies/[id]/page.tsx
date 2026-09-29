import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCompanyById } from "@/lib/db";
import CompanyMetrics from "@/components/CompanyMetrics";
import StoryCard from "@/components/StoryCard";
import EmptyState from "@/components/EmptyState";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const company = await getCompanyById(id);
  if (!company) return { title: "Company Not Found" };
  return { title: `${company.name} – Company Profile` };
}

export default async function CompanyPage({ params }: Props) {
  const { id } = await params;
  const company = await getCompanyById(id);

  if (!company) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8"
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
        All Companies
      </Link>

      {/* Company header */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
          <Image
            src={company.logoUrl}
            alt={`${company.name} logo`}
            fill
            className="object-contain p-2"
            sizes="80px"
            priority
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <span className="inline-block text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full px-2.5 py-0.5">
              {company.industry}
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed mt-2">{company.summary}</p>
          <a
            href={company.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            {company.websiteUrl.replace(/^https?:\/\//, "")}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Metrics */}
      <CompanyMetrics
        employeeCount={company.employeeCount}
        foundedYear={company.foundedYear}
        headquarters={company.headquarters}
        industry={company.industry}
      />

      {/* Stories */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Published Stories
          <span className="ml-2 text-base font-normal text-gray-500">
            ({company.stories.length})
          </span>
        </h2>

        {company.stories.length === 0 ? (
          <EmptyState
            title="No published stories"
            description="This company hasn't published any stories yet."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.stories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                publishedAt={story.publishedAt}
                company={{
                  id: company.id,
                  name: company.name,
                  logoUrl: company.logoUrl,
                  industry: company.industry,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
