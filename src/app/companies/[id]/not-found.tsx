import Link from "next/link";

export default function CompanyNotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-5xl font-bold text-indigo-600 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Company not found
      </h1>
      <p className="text-gray-500 mb-8">
        The company you&apos;re looking for doesn&apos;t exist or may have been
        removed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
