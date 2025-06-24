import { Textarea } from "@/components/ui/textarea"
import {
  useCheckMomoStatus,
  useContactWinner,
  useWinnerAudit,
} from "@/network/api/winner-management"
import type { DrawWinner } from "@/types/draw-management"
import type { PrizeCategory } from "@/types/winner-management"
import { addDays, format, isSameDay, parseISO } from "date-fns"
import { Check, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { DialogShimmerLoader } from "../loaders/dialog-shimmer-loader"
import ContactLogItem from "./ContactLogItem"
import Modal from "./Modal"
import ProgressBar from "./ProgressBar"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuth } from "@/context/auth/auth-context"
import { ConfirmationModal } from "./confirmation-modal"
import { useConfirmation } from "@/hooks/use-confirmation"
import { NextDrawCountdown } from "@/screens/draw-management/next-draw-countdown"

interface ContactWinnerModalProps {
  isOpen: boolean
  onClose: () => void
  drawInfo: Omit<PrizeCategory, "runnerUps"> | null
  winnerInfo: DrawWinner | null
}

const ContactWinnerModal: React.FC<ContactWinnerModalProps> = ({
  isOpen,
  onClose,
  drawInfo,
  winnerInfo,
}) => {
  const { role } = useAuth()
  const { isLoading: isLoadingMomoStatus, data } = useCheckMomoStatus(
    winnerInfo?.id || ""
  )
  const { isLoading: loadingAudit, data: auditData } = useWinnerAudit({
    winnerId: winnerInfo?.id,
  })
  const [note, setNote] = useState("")
  const [countdownEnd, setCountdownEnd] = useState<Date | null>(null)

  const { confirmation, requestConfirmation, cancelConfirmation, confirm } =
    useConfirmation()

  const isMomoUser = winnerInfo?.hasMomoAccount || data?.data?.hasMomoAccount
  const today = new Date()
  const attemptsToday =
    auditData?.data?.attempts?.filter(att =>
      isSameDay(parseISO(att.timestamp as string), today)
    ) ?? []
  const canContact = attemptsToday.length < 3 && note

  const contactWinnerMut = useContactWinner()

  const handleContactAttempt = (status: "Successful" | "Failed") => {
    if (winnerInfo?.id) {
      contactWinnerMut.mutate(
        {
          winnerId: winnerInfo.id,
          attemptStatus: status,
          notes: note || `Contact ${status.toLowerCase()}.`,
        },
        {
          onSuccess: () => {
            setNote("")
            // setConfirmationModalOpen(null)
            if (status === "Successful") onClose()
          },
          onError: error => {
            console.error("Contact attempt failed:", error)
            // setConfirmationModalOpen(null)
          },
        }
      )
    }
  }

  const handleContact = (type: "Successful" | "Failed") => {
    requestConfirmation({
      title: "Are You Sure?",
      description: `Are you sure you want to mark this contact attempt as ${type.toLowerCase()}?`,
      onConfirm: () => handleContactAttempt(type),
    })
  }

  // Find the latest successful contact attempt
  const latestSuccessfulAttempt = auditData?.data?.attempts?.find(
    att => att.status === "Successful"
  )

  // Set countdown end date based on the latest successful attempt
  useEffect(() => {
    if (latestSuccessfulAttempt && !countdownEnd) {
      const contactDate = parseISO(latestSuccessfulAttempt.timestamp as string)
      const endDate = addDays(contactDate, 30)
      setCountdownEnd(endDate)
    }
  }, [latestSuccessfulAttempt, countdownEnd])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Contact Winner" size="md">
        {isLoadingMomoStatus ? (
          <div className="flex items-center justify-center h-32">
            <p className="animate-pulse text-sm font-medium text-gray-200">
              Loading...
            </p>
          </div>
        ) : (
          <div className="space-y-5 text-gray-200">
            {/* Winner Information */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-4 bg-[#060B17] p-5 box-border rounded-md">
              <div>
                <div className="text-sm text-white mb-1">Winner:</div>
                <div
                  className={`font-bold text-sm ${
                    isMomoUser ? "text-[#FFCC08]" : "text-white"
                  }`}
                >
                  {winnerInfo?.phone}
                </div>
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

            <div className="">
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
              </div>

              {loadingAudit ? (
                <DialogShimmerLoader />
              ) : (
                <>
                  {/* Countdown Timer with Custom Label */}
                  <div className="flex mb-3 w-full justify-between items-center">
                    <h4 className="font-medium">Contact Attempts</h4>
                    <h4 className="font-light">
                      {latestSuccessfulAttempt && countdownEnd && (
                        <>
                          Remaining -{" "}
                          <strong className="font-bold">
                            {countdownEnd
                              ? Math.floor(
                                  (new Date(countdownEnd).getTime() -
                                    Date.now()) /
                                    (1000 * 60 * 60 * 24)
                                )
                              : "--"}{" "}
                            Days
                          </strong>
                        </>
                      )}
                    </h4>
                  </div>

                  {latestSuccessfulAttempt && countdownEnd && (
                    <div className="flex mb-3 justify-center items-center w-full">
                      <NextDrawCountdown
                        boxSize="small"
                        className="mt-0"
                        boxLabelClassName="text-gray-400"
                        countBoxClassName="font-light"
                        targetDate={countdownEnd}
                      />
                    </div>
                  )}

                  <div className="flex flex-col bg-[#060B17] p-5 rounded-md">
                    <div className="mb-2 flex justify-between text-sm">
                      <div className="text-gray-400 mb-2">
                        Attempt limit: 9 [3 per day for 3 working days]
                      </div>
                      <div className="text-gray-300">
                        Current attempts: {auditData?.data?.totalAttempts}/9
                      </div>
                    </div>

                    <div className="space-y-4 mb-3">
                      <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 9 }).map((_, idx) => {
                          const att = auditData?.data?.attempts?.[idx]
                          let color:
                            | "yellow"
                            | "green"
                            | "blue"
                            | "red"
                            | "gray" = "gray"

                          if (att?.status === "Successful") color = "green"
                          else if (att?.status === "Failed") color = "red"
                          else if (!att) color = "gray" // for unattempted slots

                          return (
                            <ProgressBar
                              key={idx}
                              progress={1}
                              total={1}
                              color={color}
                              className="h-2"
                            />
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div>
              <h4 className="mb-2 font-medium">Contact Log</h4>
              {loadingAudit ? (
                <DialogShimmerLoader />
              ) : (
                <div className="space-y-1">
                  {(auditData?.data?.attempts?.length ?? 0) > 0 ? (
                    <>
                      {
                        auditData?.data?.attempts.reduce<{
                          prevDate: Date | null
                          dayCount: number
                          items: React.ReactNode[]
                        }>(
                          (acc, attempt, idx) => {
                            const currentDate = new Date(attempt.timestamp)
                            let dayCount = acc.dayCount
                            if (
                              !acc.prevDate ||
                              !isSameDay(acc.prevDate, currentDate)
                            ) {
                              dayCount += 1
                            }
                            acc.items.push(
                              <ContactLogItem
                                key={idx}
                                notes={attempt.notes}
                                status={attempt.status}
                                timestamp={`Day ${dayCount} - (${format(
                                  currentDate,
                                  "MMM dd, yyyy 'at' h:mm a"
                                )})`}
                                attemptNumber={idx + 1}
                              />
                            )
                            return {
                              prevDate: currentDate,
                              dayCount,
                              items: acc.items,
                            }
                          },
                          { prevDate: null, dayCount: 0, items: [] }
                        ).items
                      }
                    </>
                  ) : (
                    <div className="w-full bg-[#060B17] p-5">
                      <p className="text-sm">No contact attempts recorded</p>
                    </div>
                  )}

                  {role !== "mtnmanager" && (
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
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {role !== "mtnmanager" && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleContactAttempt("Failed")}
                      disabled={!canContact}
                      className="inline-flex items-center text-sm p-2.5 justify-center rounded font-medium bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <X size={18} className="mr-1.5" />
                      {contactWinnerMut.isPending
                        ? "Loading..."
                        : "Contact Failed Attempt"}
                    </button>
                  </TooltipTrigger>

                  {!note && (
                    <TooltipContent>
                      <p>Add note to enable!</p>
                    </TooltipContent>
                  )}
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleContactAttempt("Successful")}
                      disabled={!canContact}
                      className={cn(
                        "inline-flex items-center text-sm p-2.5 justify-center rounded font-medium bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                        contactWinnerMut.isPending && "animate-pulse"
                      )}
                    >
                      <Check size={18} className="mr-1.5" />
                      {contactWinnerMut.isPending
                        ? "Loading..."
                        : "Contact Successful"}
                    </button>
                  </TooltipTrigger>

                  {!note && (
                    <TooltipContent>
                      <p>Add note to enable!</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-3 border-t border-gray-700 pt-4">
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded px-4 py-2.5 font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {confirmation && (
        <ConfirmationModal
          open={confirmation.isOpen}
          onContinue={confirm}
          onCancel={cancelConfirmation}
          title={confirmation.title}
          description={confirmation.description}
        />
      )}
    </>
  )
}

export default ContactWinnerModal
