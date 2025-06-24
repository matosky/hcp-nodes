import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Automatically refetch data in the background when a component mounts or the window is refocused
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
      retry: 1, // retry failed requests once
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 0,
    },
  },
})
