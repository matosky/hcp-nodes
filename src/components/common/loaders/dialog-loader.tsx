import { Skeleton } from "@/components/ui/skeleton"

export function DialogLoader() {
  return (
    <div className="flex flex-col items-center py-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 pt-2">
        <Skeleton className=" h-4 w-40" />
        <Skeleton className=" h-4 w-40" />
        <Skeleton className=" h-4 w-20" />
      </div>
    </div>
  )
}
