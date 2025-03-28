"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserContextType = {
  user: UserType | null
  isFirstVisit: boolean
  hasSeenWelcome: boolean
  updateUser: (userData: Partial<UserType>) => void
  setFirstVisit: (value: boolean) => void
  setHasSeenWelcome: (value: boolean) => void
  updateThemeSettings: (settings: ThemeSettings) => void
  updateNotificationSettings: (settings: NotificationSettings) => void
  updateAccessibilitySettings: (settings: AccessibilitySettings) => void
  updateSocialSettings: (settings: SocialSettings) => void
  updateBreakTimerSettings: (settings: BreakTimerSettings) => void
  streakCount: number
  incrementStreak: () => void
}

type UserType = {
  name: string
  schoolId: string
  showMotivationalQuotes: boolean
  showWeatherInCountdown: boolean
  widgetEnabled: boolean
  themeSettings?: ThemeSettings
  notificationSettings?: NotificationSettings
  accessibilitySettings?: AccessibilitySettings
  socialSettings?: SocialSettings
  breakTimerSettings?: BreakTimerSettings
  lastVisit?: string
  streakCount?: number
  streakLastUpdated?: string
}

type ThemeSettings = {
  theme: string
  colorTheme: string
  backgroundType: string
  customBackground: string
}

type NotificationSettings = {
  enabled: boolean
  bellNotifications: boolean
  calendarReminders: boolean
  scheduleChanges: boolean
  customAlarms: boolean
}

type AccessibilitySettings = {
  lowDataMode: boolean
  offlineMode: boolean
  reduceAnimations: boolean
}

type SocialSettings = {
  shareEnabled: boolean
  publicProfile: boolean
}

type BreakTimerSettings = {
  enabled: boolean
  workDuration: number
  breakDuration: number
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false)
  const [streakCount, setStreakCount] = useState(0)

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem("clockdown-user")
    const storedFirstVisit = localStorage.getItem("clockdown-first-visit")
    const storedHasSeenWelcome = localStorage.getItem("clockdown-has-seen-welcome")

    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setStreakCount(userData.streakCount || 0)

      // Check if we need to update the streak
      updateStreakIfNeeded(userData)
    }

    if (storedFirstVisit) {
      setIsFirstVisit(storedFirstVisit === "true")
    }

    if (storedHasSeenWelcome) {
      setHasSeenWelcome(storedHasSeenWelcome === "true")
    }
  }, [])

  const updateStreakIfNeeded = (userData: UserType) => {
    const today = new Date().toLocaleDateString()
    const lastUpdated = userData.streakLastUpdated || ""

    if (lastUpdated !== today) {
      // Check if last visit was yesterday
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toLocaleDateString()

      let newStreakCount = userData.streakCount || 0

      if (lastUpdated === yesterdayString) {
        // Increment streak if last visit was yesterday
        newStreakCount += 1
      } else if (lastUpdated !== today) {
        // Reset streak if more than a day has passed
        newStreakCount = 1
      }

      // Update user data with new streak info
      const updatedUser = {
        ...userData,
        lastVisit: today,
        streakCount: newStreakCount,
        streakLastUpdated: today,
      }

      setUser(updatedUser)
      setStreakCount(newStreakCount)
      localStorage.setItem("clockdown-user", JSON.stringify(updatedUser))
    }
  }

  const updateUser = (userData: Partial<UserType>) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...userData }
      localStorage.setItem("clockdown-user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const updateThemeSettings = (settings: ThemeSettings) => {
    setUser((prev) => {
      if (!prev) return prev
      const updatedUser = { ...prev, themeSettings: settings }
      localStorage.setItem("clockdown-user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const updateNotificationSettings = (settings: NotificationSettings) => {
    setUser((prev) => {
      if (!prev) return prev
      const updatedUser = { ...prev, notificationSettings: settings }
      localStorage.setItem("clockdown-user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const updateAccessibilitySettings = (settings: AccessibilitySettings) => {
    setUser((prev) => {
      if (!prev) return prev
      const updatedUser = { ...prev, accessibilitySettings: settings }
      localStorage.setItem("clockdown-user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const updateSocialSettings = (settings: SocialSettings) => {
    setUser((prev) => {
      if (!prev) return prev
      const updatedUser = { ...prev, socialSettings: settings }
      localStorage.setItem("clockdown-user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const updateBreakTimerSettings = (settings: BreakTimerSettings) => {
    setUser((prev) => {
      if (!prev) return prev
      const updatedUser = { ...prev, breakTimerSettings: settings }
      localStorage.setItem("clockdown-user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const setFirstVisitState = (value: boolean) => {
    setIsFirstVisit(value)
    localStorage.setItem("clockdown-first-visit", value.toString())
  }

  const setHasSeenWelcomeState = (value: boolean) => {
    setHasSeenWelcome(value)
    localStorage.setItem("clockdown-has-seen-welcome", value.toString())
  }

  const incrementStreak = () => {
    setUser((prev) => {
      if (!prev) return prev

      const today = new Date().toLocaleDateString()
      const newStreakCount = (prev.streakCount || 0) + 1

      const updatedUser = {
        ...prev,
        streakCount: newStreakCount,
        streakLastUpdated: today,
      }

      setStreakCount(newStreakCount)
      localStorage.setItem("clockdown-user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isFirstVisit,
        hasSeenWelcome,
        updateUser,
        setFirstVisit: setFirstVisitState,
        setHasSeenWelcome: setHasSeenWelcomeState,
        updateThemeSettings,
        updateNotificationSettings,
        updateAccessibilitySettings,
        updateSocialSettings,
        updateBreakTimerSettings,
        streakCount,
        incrementStreak,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

