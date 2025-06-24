import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmationModalProps {
  open: boolean
  title: string
  description: string
  onCancel: () => void
  onContinue: () => void
}

export function ConfirmationModal({
  open,
  title,
  description,
  onCancel,
  onContinue,
}: ConfirmationModalProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) {
          onCancel()
        }
      }}
    >
      <AlertDialogContent className="bg-gradient-to-r from-secondary to-gradientSecondary text-white border-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="font-light text-gray-300">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <button
            onClick={onCancel}
            className="text-gray-400 px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="text-gray-900 bg-white px-4 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Continue
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
