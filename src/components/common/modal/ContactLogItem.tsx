import React from "react"
import { Check, X } from "lucide-react"
import type { ContactAttemptStatus } from "@/types/winner-management"
import { cn } from "@/lib/utils"

interface ContactLogItemProps {
  status: ContactAttemptStatus
  timestamp?: string
  attemptNumber?: number
  notes?: string
}

const ContactLogItem: React.FC<ContactLogItemProps> = ({
  status,
  notes,
  timestamp,
  attemptNumber,
}) => {
  const isSuccessful = status === "Successful"

  return (
    <div className="flex items-center py-1.5 text-sm">
      <div
        className={`mr-2.5 flex h-5 w-5 items-center justify-center rounded-full ${
          isSuccessful
            ? "bg-green-500/20 text-green-500"
            : "bg-red-500/20 text-red-500"
        }`}
      >
        {isSuccessful ? <Check size={14} /> : <X size={14} />}
      </div>
      <div className="flex flex-col">
        <div className={`${isSuccessful ? "text-green-500" : "text-red-500"}`}>
          Contact Attempt {isSuccessful ? "Successful" : "Failed"}
          {timestamp && (
            <span className="ml-2 text-gray-400 text-xs">{timestamp}</span>
          )}
          {attemptNumber && (
            <span className="ml-1 text-gray-400 text-xs">#{attemptNumber}</span>
          )}
        </div>
        <p
          className={cn(
            "text-xs",
            `${isSuccessful ? "text-green-500" : "text-red-500"}`
          )}
        >
          {notes}
        </p>
      </div>
    </div>
  )
}

export default ContactLogItem
