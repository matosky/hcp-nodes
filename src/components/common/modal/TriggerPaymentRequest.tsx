import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  useCheckMomoStatus,
  useInitiatePrizeClaim,
} from "@/network/api/winner-management"
import type { DrawWinner } from "@/types/draw-management"
import type { PrizeCategory } from "@/types/winner-management"
import { useQueryClient } from "@tanstack/react-query"
import { OctagonAlert } from "lucide-react"
import React, { useEffect, useState } from "react"
import Modal from "./Modal"
import { useAuth } from "@/context/auth/auth-context"

interface TriggerPaymentReqModalProps {
  isOpen: boolean
  onClose: () => void
  winnerInfo: DrawWinner | null
  drawInfo: Omit<PrizeCategory, "runnerUps"> | null
}

const TriggerPaymentReqModal: React.FC<TriggerPaymentReqModalProps> = ({
  isOpen,
  onClose,
  winnerInfo,
  drawInfo,
}) => {
  const { role } = useAuth()
  const [adminNotes, setAdminNotes] = useState("")
  const [checkMomoStatusWinnerId, setCheckMomoStatusWinnerId] = useState<
    string | null
  >(null)
  const {
    isLoading: isLoadingMomoStatus,
    isFetching,
    data,
  } = useCheckMomoStatus(checkMomoStatusWinnerId || "")
  const isMomoUser = winnerInfo?.hasMomoAccount || data?.data?.hasMomoAccount

  useEffect(() => {
    if (winnerInfo?.id) {
      setCheckMomoStatusWinnerId(winnerInfo.id)
    }
  }, [winnerInfo])

  const initiatePrizeClaimMut = useInitiatePrizeClaim()

  const qc = useQueryClient()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Trigger Payment Request"
      size="md"
    >
      <div className="space-y-6 text-gray-200">
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

        <div className="flex justify-start items-center mb-4 gap-3">
          <img
            src="/momo-icon.png"
            className={`w-[20px] ${
              isMomoUser ? "" : "opacity-40 mix-blend-luminosity"
            }`}
            alt="momo"
          />
          <span
            className={`
                ${isMomoUser ? "text-[#FFCC08]" : "text-white"} text-sm`}
          >
            {isMomoUser ? "MOMO account confirmed" : "Not a MOMO User"}
          </span>

          {!isMomoUser && (
            <button
              className={cn(
                "inline-flex items-center justify-center rounded p-2 text-xs font-medium bg-yellow-500 text-gray-900 ml-2 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors",
                isLoadingMomoStatus && "animate-pulse",
                role === "mtnmanager" && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => {
                if (winnerInfo?.id) {
                  console.log("Checking MOMO status for winner:", winnerInfo.id)
                  qc.invalidateQueries({
                    queryKey: ["momo-status", winnerInfo.id],
                  })
                }
              }}
              disabled={role === "mtnmanager"}
            >
              {isLoadingMomoStatus || isFetching
                ? "Loading..."
                : "Check MOMO Status"}
            </button>
          )}
        </div>

        {role !== "mtnmanager" && (
          <div>
            <h4 className="mb-2 font-medium text-gray-400 pt-3">Admin Notes</h4>
            <Textarea
              placeholder="Say something about the claim made"
              className="text-xs text-gray-300 placeholder:text-gray-700 border-white min-h-[100px]"
              onChange={({ target }) => setAdminNotes(target.value)}
            />
          </div>
        )}

        <div className="flex justify-start items-start gap-2">
          <OctagonAlert size={20} color="#FFCC08" />
          <span className="text-xs text-[#FFCC08]">
            Trigger the Payment Request Only if the Winner has Opened a MoMo
            Account
            <br />
            {`Note: Upon submission, the winner's status will be updated to
            "Payment Processing" and moved to the Payments page for processing.`}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded p-2.5 font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            Cancel
          </button>
          {role !== "mtnmanager" && (
            <button
              onClick={() => {
                if (winnerInfo?.id) {
                  initiatePrizeClaimMut.mutate(
                    {
                      adminNotes:
                        adminNotes ||
                        `Triggering prize claim for ${winnerInfo?.phone}`,
                      winnerId: winnerInfo.id,
                      hasMomoAccountConfirmed: Boolean(isMomoUser),
                    },
                    {
                      onSuccess: () => {
                        onClose()
                      },
                    }
                  )
                }
              }}
              className={cn(
                "inline-flex items-center justify-center rounded p-2.5 font-medium bg-yellow-500 text-gray-900 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors",
                initiatePrizeClaimMut.isPending && "animate-pulse",
                !isMomoUser && "opacity-50 cursor-not-allowed"
              )}
              disabled={!isMomoUser}
            >
              {initiatePrizeClaimMut.isPending
                ? "Loading..."
                : "Trigger Payment Request"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default TriggerPaymentReqModal
