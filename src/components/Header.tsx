import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm select-none">
              CP
            </span>
            <span className="font-semibold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
              ContentPlatform
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#companies"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Companies
            </Link>
            <Link
              href="/#stories"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Stories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
