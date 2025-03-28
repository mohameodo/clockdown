"use client"

import { useEffect } from "react"
import { useUser } from "@/components/user-provider"
import { useTheme } from "next-themes"

export function ThemeCustomizer() {
  const { user } = useUser()
  const { setTheme } = useTheme()

  // Set theme based on user preferences
  useEffect(() => {
    if (user?.themeSettings?.theme) {
      setTheme(user.themeSettings.theme)
    }
  }, [user?.themeSettings?.theme, setTheme])

  // Apply color theme class
  useEffect(() => {
    if (user?.themeSettings?.colorTheme && user.themeSettings.colorTheme !== "blue") {
      document.documentElement.classList.add(`theme-${user.themeSettings.colorTheme}`)

      return () => {
        document.documentElement.classList.remove(`theme-${user.themeSettings.colorTheme}`)
      }
    }
  }, [user?.themeSettings?.colorTheme])

  // Apply custom background if set
  useEffect(() => {
    if (user?.themeSettings?.backgroundType === "image" && user?.themeSettings?.customBackground) {
      const style = document.createElement("style")
      style.id = "custom-background-style"
      style.innerHTML = `
        body {
          background-image: url(${user.themeSettings.customBackground});
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: -1;
        }
        
        .transparent-card {
          background-color: rgba(var(--card), 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `

      document.head.appendChild(style)

      return () => {
        const existingStyle = document.getElementById("custom-background-style")
        if (existingStyle) {
          existingStyle.remove()
        }
      }
    }
  }, [user?.themeSettings?.backgroundType, user?.themeSettings?.customBackground])

  // This is a utility component that doesn't render anything
  return null
}

