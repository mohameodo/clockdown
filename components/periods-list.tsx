"use client"

import { useState, useEffect } from "react"
import { getUpcomingPeriods } from "@/lib/schools"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, Calendar } from "lucide-react"

export function PeriodsList({ school, currentTime }) {
  const [upcomingPeriods, setUpcomingPeriods] = useState([])
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(-1)
  const [dayGaps, setDayGaps] = useState<number[]>([])

  useEffect(() => {
    if (school) {
      const periods = getUpcomingPeriods(school, currentTime, 7)
      setUpcomingPeriods(periods)

      // Find the current period index
      const now = currentTime
        .toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(":", "")

      const currentIndex = periods.findIndex((period) => {
        if (period.isDayGap) return false
        const startTime = period.startTime.replace(":", "")
        const endTime = period.endTime.replace(":", "")
        return now >= startTime && now < endTime
      })

      setCurrentPeriodIndex(currentIndex)

      // Detect day gaps between periods
      const gaps = []
      if (periods.length > 1) {
        for (let i = 0; i < periods.length; i++) {
          if (periods[i].isDayGap) {
            gaps.push(i)
          }
        }
      }
      setDayGaps(gaps)
    }
  }, [school, currentTime])

  if (!upcomingPeriods.length) {
    return (
      <div className="text-center py-2">
        <p className="text-muted-foreground text-xs">No upcoming periods for today</p>
      </div>
    )
  }

  return (
    <div className="space-y-1 animate-slide-up">
      {upcomingPeriods.map((period, index) => {
        if (period.isDayGap) {
          return (
            <div key={`gap-${index}`} className="day-gap flex items-center justify-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Next Day</span>
            </div>
          )
        }

        const isCurrentPeriod = index === currentPeriodIndex

        return (
          <div
            key={`${period.name}-${index}`}
            className={`flex justify-between items-center p-1.5 rounded-md transition-all duration-300 ${
              isCurrentPeriod ? "bg-primary/10 border-l-2 border-primary" : "hover:bg-muted"
            } mobile-compact`}
          >
            <div className="flex items-center">
              {isCurrentPeriod ? (
                <Badge variant="secondary" className="mr-1 animate-pulse-light text-xs px-1.5 py-0.5">
                  Now
                </Badge>
              ) : (
                <Clock className="h-3 w-3 text-muted-foreground mr-1" />
              )}
              <div className="font-medium text-xs">{period.name}</div>
            </div>
            <div className="text-xs text-muted-foreground flex items-center">
              {period.startTime} - {period.endTime}
              <ArrowRight className="h-2 w-2 ml-1 opacity-50" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

