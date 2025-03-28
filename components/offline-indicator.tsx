"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Set up event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true)
      toast({
        title: "You're back online",
        description: "Connection restored. All features are now available.",
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: "You're offline",
        description: "Some features may be limited. We'll keep working with cached data.",
        variant: "destructive",
      })
    }

    // Check initial status
    setIsOnline(navigator.onLine)

    // Add event listeners
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Clean up
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [toast])

  if (isOnline) return null

  return (
    <div className="fixed bottom-16 sm:bottom-4 right-4 z-50 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-xs flex items-center shadow-lg">
      <WifiOff className="h-3 w-3 mr-1.5" />
      <span>Offline Mode</span>
    </div>
  )
}

