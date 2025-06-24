import React from "react"

interface ProgressBarProps {
  progress: number
  total: number
  color?: "yellow" | "green" | "blue" | "red" | "gray"
  showLabel?: boolean
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total,
  color = "yellow",
  showLabel = false,
  className = "",
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100)

  const colorClasses = {
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between mb-1">
        {showLabel && (
          <>
            <span className="text-xs font-medium text-gray-300">Progress</span>
            <span className="text-xs font-medium text-gray-300">
              {progress}/{total}
            </span>
          </>
        )}
      </div>
      <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
