"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Bell, CloudSun } from "lucide-react"
import { useUser } from "@/components/user-provider"

type CountdownProps = {
  targetTime: Date | null
  label: string
  endLabel: string
  periodName?: string
  showProgress?: boolean
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  weatherData?: any
}

export function EnhancedCountdown({
  targetTime,
  label,
  endLabel,
  periodName,
  showProgress = true,
  className = "",
  size = "lg",
  weatherData,
}: CountdownProps) {
  const { user } = useUser()
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [bellRinging, setBellRinging] = useState(false)
  const [totalDuration, setTotalDuration] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio("/bell-sound.mp3")

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, []) // Empty dependency array to run only once

  useEffect(() => {
    if (!targetTime) {
      setIsActive(false)
      return
    }

    // Calculate total duration when target time changes
    const now = new Date()
    const difference = targetTime.getTime() - now.getTime()
    if (difference > 0) {
      setTotalDuration(difference)
      setElapsedTime(0)
    }

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetTime.getTime() - now.getTime()

      if (difference <= 0) {
        // Trigger bell ring animation when countdown reaches zero
        if (isActive) {
          setBellRinging(true)

          // Play bell sound
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch((err) => console.error("Error playing bell sound:", err))
          }

          // Show browser notification if enabled
          if (user?.notificationSettings?.enabled && user?.notificationSettings?.bellNotifications) {
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Period Change", {
                body: `${endLabel} ${periodName ? `- ${periodName}` : ""}`,
                icon: "/icon-192x192.png",
              })
            }
          }

          setTimeout(() => setBellRinging(false), 3000)
        }

        setIsActive(false)
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        setProgress(100)
        return
      }

      setIsActive(true)

      // Calculate hours, minutes, seconds
      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })

      // Calculate progress
      if (showProgress && totalDuration > 0) {
        const elapsed = totalDuration - difference
        setElapsedTime(elapsed)
        const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
        setProgress(progressPercent)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetTime, showProgress, totalDuration, isActive, user, endLabel, periodName]) // Added missing dependencies

  const formatDigit = (digit: number) => {
    return digit.toString().padStart(2, "0")
  }

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl",
    xl: "text-5xl md:text-7xl",
  }

  const digitClasses = `countdown-digit font-mono font-bold ${sizeClasses[size]}`
  const separatorClasses = `countdown-separator font-mono font-bold ${sizeClasses[size]}`

  if (!isActive) {
    return (
      <Card className={`${className} border-0 `}>
        <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4">
          <div className="flex items-center mb-2">
            <Bell className={`mr-2 h-5 w-5 text-primary ${bellRinging ? "bell-ring" : ""}`} />
            <span className="text-base font-medium">{endLabel}</span>
          </div>
          {periodName && (
            <Badge variant="outline" className="mt-2 text-xs">
              {periodName}
            </Badge>
          )}
        </CardContent>
      </Card>
    )
  }

  // Calculate time remaining as percentage of total for more accurate progress
  const timeRemaining = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds
  const formattedTimeRemaining = `${timeLeft.hours > 0 ? timeLeft.hours + "h " : ""}${timeLeft.minutes}m ${timeLeft.seconds}s`

  return (
    <Card className={`${className} border-0  overflow-hidden`}>
      <CardContent className="countdown-container">
        <div className="flex items-center justify-between mb-3 w-full">
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary animate-pulse" />
            <span className="text-base font-medium">{label}</span>
          </div>

          {user?.showWeatherInCountdown && weatherData && (
            <div className="weather-in-countdown">
              <CloudSun className="h-3 w-3 mr-1" />
              <span>{weatherData.temperature}°</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mb-4">
          <span className={digitClasses}>{formatDigit(timeLeft.hours)}</span>
          <span className={separatorClasses}>:</span>
          <span className={digitClasses}>{formatDigit(timeLeft.minutes)}</span>
          <span className={separatorClasses}>:</span>
          <span className={digitClasses}>{formatDigit(timeLeft.seconds)}</span>
        </div>

        {periodName && (
          <Badge variant="outline" className="mb-3 text-xs px-2 py-0.5">
            {periodName}
          </Badge>
        )}

        {showProgress && (
          <div className="w-full space-y-1">
            <Progress value={progress} className="w-full h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.round(progress)}% complete</span>
              <span>{formattedTimeRemaining} remaining</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

