import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

interface StoryCardProps {
  id: string;
  title: string;
  publishedAt: Date | null;
  company: {
    id: string;
    name: string;
    logoUrl: string;
    industry: string;
  };
}

export default function StoryCard({
  id,
  title,
  publishedAt,
  company,
}: StoryCardProps) {
  return (
    <Link
      href={`/stories/${id}`}
      className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-8 h-8 rounded-md overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
          <Image
            src={company.logoUrl}
            alt={`${company.name} logo`}
            fill
            className="object-contain p-0.5"
            sizes="32px"
          />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-700">{company.name}</p>
          <p className="text-xs text-gray-400">{company.industry}</p>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
        {title}
      </h3>

      {publishedAt && (
        <p className="mt-3 text-xs text-gray-400">
          {format(new Date(publishedAt), "MMM d, yyyy")}
        </p>
      )}
    </Link>
  );
}
