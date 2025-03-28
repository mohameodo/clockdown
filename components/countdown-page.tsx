"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedCountdown } from "@/components/enhanced-countdown"
import { PeriodsList } from "@/components/periods-list"
import { WeatherWidget } from "@/components/weather-widget"
import { MotivationalQuote } from "@/components/motivational-quote"
import { getSchoolData, getCurrentPeriod, getNextPeriod } from "@/lib/schools"
import { useUser } from "@/components/user-provider"
import { useTheme } from "next-themes"
import { Clock, ChevronRight } from "lucide-react"

export function CountdownPage() {
  const { user } = useUser()
  const { theme } = useTheme()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [school, setSchool] = useState(null)
  const [currentPeriod, setCurrentPeriod] = useState(null)
  const [nextPeriod, setNextPeriod] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    // Load school data
    const loadSchoolData = async () => {
      if (user?.schoolId) {
        try {
          const schoolData = await getSchoolData(user.schoolId)
          setSchool(schoolData)
        } catch (error) {
          console.error("Failed to load school data:", error)
        }
      }
    }

    loadSchoolData()

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [user?.schoolId])

  // Update periods when school data or time changes
  useEffect(() => {
    if (school) {
      const current = getCurrentPeriod(school, currentTime)
      const next = getNextPeriod(school, currentTime)

      setCurrentPeriod(current)
      setNextPeriod(next)
    }
  }, [school, currentTime])

  // Calculate target time for countdown
  const getTargetTime = () => {
    if (!currentPeriod && !nextPeriod) return null

    if (currentPeriod) {
      // If we're in a period, count down to the end of the period
      const [hours, minutes] = currentPeriod.endTime.split(":").map(Number)
      const endTime = new Date(currentTime)
      endTime.setHours(hours, minutes, 0, 0)
      return endTime
    } else if (nextPeriod) {
      // If we're between periods, count down to the start of the next period
      const [hours, minutes] = nextPeriod.startTime.split(":").map(Number)
      const startTime = new Date(currentTime)
      startTime.setHours(hours, minutes, 0, 0)
      return startTime
    }

    return null
  }

  // Handle weather data update
  const handleWeatherUpdate = (data) => {
    setWeatherData(data)
  }

  // Format current time
  const formattedTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const formattedDate = currentTime.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })

  // Determine countdown label and end label
  const countdownLabel = currentPeriod
    ? `${currentPeriod.name} ends in`
    : nextPeriod
      ? `${nextPeriod.name} starts in`
      : "School day ended"

  const endLabel = currentPeriod
    ? `${currentPeriod.name} ended`
    : nextPeriod
      ? `${nextPeriod.name} started`
      : "School day ended"

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main countdown section */}
        <div className="md:col-span-2 space-y-4">
          <Card className="border-0 glass-effect">
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg sm:text-xl">
                    {user?.name ? `Hello, ${user.name}` : "Hello, Student"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{formattedDate}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-mono">{formattedTime}</div>
                  <p className="text-xs text-muted-foreground">{school ? school.name : "Loading school..."}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <EnhancedCountdown
                targetTime={getTargetTime()}
                label={countdownLabel}
                endLabel={endLabel}
                periodName={currentPeriod?.name || nextPeriod?.name}
                weatherData={weatherData}
                className="mb-4"
              />

              {user?.showMotivationalQuotes && <MotivationalQuote className="mt-4 card-quote" />}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with schedule and weather */}
        <div className="space-y-4">
          <Card className="border-0 glass-effect">
            <CardHeader className="pb-2 pt-3 px-3 sm:px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">Today's Schedule</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <PeriodsList school={school} currentTime={currentTime} />
              {school && (
                <div className="mt-4 school-info-sidebar">
             
                  <Link href={`/school/${school.id}`} className="view-all-button">
                    <span>View Schedule</span>
                    <ChevronRight className="h-3 w-3 ml-0.5" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <WeatherWidget schoolId={user?.schoolId} onWeatherUpdate={handleWeatherUpdate} />
        </div>
      </div>
    </div>
  )
}

