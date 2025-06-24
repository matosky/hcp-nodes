import type { DrawWinner } from "@/types/draw-management"
import React, { useState } from "react"
import Modal from "./Modal"
import { UploadCloud } from "lucide-react"
import { useWinnerById } from "@/network/api/winner-management"
import { format } from "date-fns"
import { useGetDrawById } from "@/network/api/draws/draws"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/auth/auth-context"

interface ContactWinnerModalProps {
  isOpen: boolean
  onClose: () => void
  winnerInfo: DrawWinner | null
}

export const ViewPayoutDetailModal: React.FC<ContactWinnerModalProps> = ({
  isOpen,
  onClose,
  winnerInfo,
}) => {
  const { data, isLoading } = useWinnerById({ winnerId: winnerInfo?.id })
  const { data: drawData, isLoading: loadingDraw } = useGetDrawById({
    drawId: winnerInfo?.drawId,
  })
  const [note, setNote] = useState("")
  const { role } = useAuth()
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const pd = data

  // Add this function to handle file uploads
  const handleFileChange = (file: File) => {
    // Implement your file upload logic here
    // For now, just log the file
    console.log("Selected file:", file)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Details" size="lg">
      {isLoading || loadingDraw ? (
        <div className="flex items-center justify-center h-32">
          <p className="animate-pulse text-sm font-medium text-gray-200">
            Loading...
          </p>
        </div>
      ) : (
        <div className="space-y-6 text-gray-200">
          {/* Winner Details Section */}
          <section className="mb-6">
            <h3 className="mb-2 text-base font-semibold text-gray-200">
              Winner Details
            </h3>

            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3 md:gap-x-8 bg-[#060B17] rounded-md p-6">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs">Winner</span>
                <span className="font-medium text-white capitalize">
                  {pd?.winnerLastName} {pd?.winnerFirstName}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs">Draw Day:</span>
                <span className="font-medium text-white">
                  {drawData?.drawDate ? format(new Date(drawData.drawDate), "dd MMMM yyyy") : "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs">Date:</span>
                <span className="font-medium text-white">
                  {pd?.winDate ? format(new Date(pd.winDate), "dd MMMM yyyy") : "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs">Prize Won:</span>
                <span className="font-medium text-white">
                  {pd?.prizeCategory}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs">Amount:</span>
                <span className="font-medium text-white">
                  {pd?.prizeAmount.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </span>
              </div>
            </div>
          </section>

          {/* Payment Details Section */}
          <section className="mb-6">
            <h3 className="mb-2 text-base font-semibold text-gray-200">
              Payment Details
            </h3>
            <div className="bg-[#060B17] rounded-md p-6">
              <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-start">
                {pd?.payout?.status === "SUCCESSFUL" && (
                  <span className="px-3 py-1 text-sm bg-green-500 rounded-md text-black">
                    Payment Successful
                  </span>
                )}
                {pd?.payout?.status === "PENDING" && (
                  <span className="px-3 py-1 text-sm bg-yellow-500 rounded-md text-black">
                    Payment Pending
                  </span>
                )}
                {pd?.payout?.status === "FAILED" && (
                  <span className="px-3 py-1 text-sm bg-red-500 rounded-md text-white">
                    Payment Failed
                  </span>
                )}
                {/* Add other status badges as needed */}
              </div>
              <div className="grid grid-cols-1 gap-4 mt-4 text-sm md:grid-cols-2 md:gap-x-8">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs">
                    Date & Time Initiated
                  </span>
                  <span className="font-medium text-white">
                    {pd?.payout?.initiatedAt
                      ? format(pd?.payout?.initiatedAt, "dd MMM, yyyy hh:mm aa")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs">
                    Date & Time Received
                  </span>
                  <span className="font-medium text-white">
                    {pd?.payout?.processedAt
                      ? format(pd?.payout?.processedAt, "dd MMM, yyyy hh:mm aa")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </section>
          {role !== "mtnmanager" && (
            <section className="mb-6">
              <div>
                <h4 className="mb-2 font-medium text-gray-400 pt-3">
                  {" "}
                  Contact Note
                  <span className="text-xs text-primary/70 ml-3">
                    Add note to complete the process.
                  </span>
                </h4>
                <Textarea
                  placeholder="Say something about the attempt made"
                  className="text-xs text-gray-300 placeholder:text-gray-700 border-white min-h-[100px]"
                  onChange={({ target }) => setNote(target.value)}
                  value={note}
                />
              </div>
            </section>
          )}

          {/* Payment Receipt Section */}
          <section className="mb-6">
            <h3 className="mb-2 text-base font-semibold text-gray-200">
              Payment Receipt
            </h3>
            <div className="bg-[#060B17] rounded-md p-6">
              <div
                className="flex flex-col items-center justify-center text-center w-full border-2 border-dashed rounded-md border-gray-600 py-4 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onDrop={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileChange(e.dataTransfer.files[0])
                  }
                }}
              >
                <UploadCloud className="w-6 h-6" />
                <p className="mb-2 text-xs text-gray-400">
                  Drag and drop files here or click to browse
                </p>
                <p className="mb-4 text-sm text-red-400">
                  No payment receipt has been uploaded for this transaction.
                </p>
                <button
                  className="px-3 py-1 text-white text-xs bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  onClick={e => {
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}
                  type="button"
                >
                  Upload Receipt
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0])
                    }
                  }}
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row justify-end gap-3  pt-4">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
