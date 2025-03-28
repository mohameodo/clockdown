"use client"

import { useEffect } from "react"
import { useUser } from "@/components/user-provider"
import { useToast } from "@/components/ui/use-toast"

export function NotificationHandler() {
  const { user } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    // Request notification permission if enabled in settings
    if (user?.notificationSettings?.enabled) {
      if ("Notification" in window) {
        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              toast({
                title: "Notifications enabled",
                description: "You'll receive alerts for bell changes and important events.",
              })
            } else {
              toast({
                title: "Notifications disabled",
                description: "Enable notifications in your browser settings for alerts.",
                variant: "destructive",
              })
            }
          })
        }
      }
    }
  }, [user?.notificationSettings?.enabled, toast])

  return null
}

