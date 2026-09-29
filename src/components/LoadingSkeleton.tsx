// ---------------------------------------------------------------------------
// Generic skeleton primitives
// ---------------------------------------------------------------------------

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Story detail skeleton
// ---------------------------------------------------------------------------

export function StoryDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Company badge */}
      <div className="flex items-center gap-3">
        <SkeletonBlock className="w-10 h-10 rounded-lg" />
        <div className="space-y-1.5">
          <SkeletonBlock className="h-3.5 w-32" />
          <SkeletonBlock className="h-3 w-20" />
        </div>
      </div>
      {/* Title */}
      <div className="space-y-3">
        <SkeletonBlock className="h-8 w-3/4" />
        <SkeletonBlock className="h-8 w-1/2" />
      </div>
      {/* Meta */}
      <SkeletonBlock className="h-4 w-28" />
      {/* Content */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-4 w-full" />
        ))}
        <SkeletonBlock className="h-4 w-4/5" />
        <SkeletonBlock className="h-48 w-full rounded-xl" />
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBlock key={`b${i}`} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Company detail skeleton
// ---------------------------------------------------------------------------

export function CompanyDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex items-start gap-6">
        <SkeletonBlock className="w-20 h-20 rounded-xl flex-shrink-0" />
        <div className="space-y-3 flex-1">
          <SkeletonBlock className="h-7 w-48" />
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-5/6" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-20 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-44 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Homepage skeleton
// ---------------------------------------------------------------------------

export function HomepageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-52 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
