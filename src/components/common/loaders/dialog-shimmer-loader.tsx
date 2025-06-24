
export const DialogShimmerLoader = () => {
  return (
    <div className="w-full">
      {/* Header skeleton */}
      <div className="mb-2 w-full">
        <div className="h-5 w-24  bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Contact log items skeleton */}
      <div className="space-y-1 w-full">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center py-1.5">
            {/* Icon skeleton */}
            <div className="mr-2.5 h-5 w-full bg-gray-700 rounded-full animate-pulse"></div>

            {/* Content skeleton */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                {/* Status text skeleton */}
                <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                {/* Timestamp skeleton */}
                <div className="h-3 w-20 bg-gray-700 rounded animate-pulse"></div>
                {/* Attempt number skeleton */}
                <div className="h-3 w-6 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

