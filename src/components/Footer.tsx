import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs select-none">
              CP
            </span>
            <span className="font-semibold text-gray-700">ContentPlatform</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-800 transition-colors">
              Home
            </Link>
            <Link
              href="/#companies"
              className="hover:text-gray-800 transition-colors"
            >
              Companies
            </Link>
            <Link
              href="/#stories"
              className="hover:text-gray-800 transition-colors"
            >
              Stories
            </Link>
          </nav>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ContentPlatform
          </p>
        </div>
      </div>
    </footer>
  );
}
