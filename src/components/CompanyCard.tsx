import Link from "next/link";
import Image from "next/image";

interface CompanyCardProps {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  headquarters: string;
  summary: string;
  publishedStoryCount: number;
}

export default function CompanyCard({
  id,
  name,
  logoUrl,
  industry,
  headquarters,
  summary,
  publishedStoryCount,
}: CompanyCardProps) {
  return (
    <Link
      href={`/companies/${id}`}
      className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            fill
            className="object-contain p-1"
            sizes="48px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
            {name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{industry}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600 line-clamp-2">{summary}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">{headquarters}</span>
        <span className="text-xs font-medium text-indigo-600">
          {publishedStoryCount} {publishedStoryCount === 1 ? "story" : "stories"}
        </span>
      </div>
    </Link>
  );
}
