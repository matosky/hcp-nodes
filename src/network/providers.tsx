import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./query-client"
import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
          {children}
      </TooltipProvider>
    </QueryClientProvider>
  )
}
