export function LinearLoader({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1 bg-gradient-to-r from-primary via-primary to-gradientPrimary animate-loader" />
    </div>
  )
}
