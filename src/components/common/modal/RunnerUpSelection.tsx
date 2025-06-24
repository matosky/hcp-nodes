import React from "react"
import Modal from "./Modal"
import type { DrawWinner } from "@/types/draw-management"
import { TriangleAlert } from "lucide-react"
import type { PrizeCategory } from "@/types/winner-management"

interface RunnerUpNoticeModalProps {
  isOpen: boolean
  onClose: () => void
  drawInfo: Omit<PrizeCategory, "runnerUps"> | null
  winnerInfo: DrawWinner | null
  handleOkay: () => void
}

const RunnerUpNoticeModal: React.FC<RunnerUpNoticeModalProps> = ({
  isOpen,
  onClose,
  winnerInfo,
  drawInfo,
  handleOkay,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex flex-row justify-start items-center gap-2 md:gap-4">
          <TriangleAlert size={24} color="#FFCC08" />
          Runner-Up Selection
        </span>
      }
      size="md"
    >
      <div className="space-y-6 text-gray-200">
        <p className="text-sm font-bold">
          You are about to contact a{" "}
          <span className="text-[#FFCC08]">runner-up</span> participant, not the
          main winner.
        </p>
        <p className="text-sm">
          Please confirm that the main winner has{" "}
          <span className="text-[#FF0835] font-bold">forfeited</span> their
          prize before proceeding.
        </p>
        {/* Winner Information */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 bg-[#060B17] p-5 box-border">
          <div>
            <div className="text-sm text-white mb-1">Winner:</div>
            <div className="font-bold text-sm">{winnerInfo?.phone}</div>
          </div>

          <div>
            <div className="text-xs text-white mb-1">Draw:</div>
            <div className="font-bold text-sm">{winnerInfo?.drawDay}</div>
          </div>

          <div>
            <div className="text-sm text-white mb-1">Draw Date:</div>
            <div className="font-bold text-sm">{winnerInfo?.drawDate}</div>
          </div>

          <div>
            <div className="text-sm text-white mb-1">Prize:</div>
            <div className="font-bold text-sm">{winnerInfo?.prizeWon}</div>
          </div>

          <div>
            <div className="text-sm text-white mb-1">Amount:</div>
            <div className="font-bold text-sm">
              {drawInfo?.amount.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 0,
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded p-2.5 font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => handleOkay()}
            className="inline-flex items-center justify-center rounded p-2.5  font-medium bg-yellow-500 text-gray-900 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            Confirm & Continue
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default RunnerUpNoticeModal
