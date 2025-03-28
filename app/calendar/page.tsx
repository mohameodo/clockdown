"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { getSchoolData, getSchoolCalendarEvents } from "@/lib/schools"
import { useUser } from "@/components/user-provider"
import { CalendarIcon, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CalendarPage() {
  const { user } = useUser()
  const [school, setSchool] = useState(null)
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSchoolData = async () => {
      if (user?.schoolId) {
        try {
          const schoolData = await getSchoolData(user.schoolId)
          setSchool(schoolData)

          // Get calendar events for the entire year
          const startDate = new Date(date.getFullYear(), 0, 1) // Jan 1
          const endDate = new Date(date.getFullYear(), 11, 31) // Dec 31

          const calendarEvents = schoolData.calendar ? getSchoolCalendarEvents(schoolData, startDate, endDate) : []

          setEvents(calendarEvents)
        } catch (error) {
          console.error("Failed to load school data:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    loadSchoolData()
  }, [user?.schoolId, date.getFullYear()])

  // Function to check if a date has events
  const hasEvent = (day) => {
    return events.some(
      (event) =>
        day.getDate() === event.date.getDate() &&
        day.getMonth() === event.date.getMonth() &&
        day.getFullYear() === event.date.getFullYear(),
    )
  }

  // Function to get events for selected date
  const getEventsForDate = (selectedDate) => {
    return events.filter(
      (event) =>
        selectedDate.getDate() === event.date.getDate() &&
        selectedDate.getMonth() === event.date.getMonth() &&
        selectedDate.getFullYear() === event.date.getFullYear(),
    )
  }

  // Events for the selected date
  const selectedDateEvents = getEventsForDate(date)

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card className="border-0 glass-effect">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                School Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  event: (day) => hasEvent(day),
                }}
                modifiersClassNames={{
                  event: "bg-primary/10 font-bold text-primary",
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-0 glass-effect">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map((event, index) => (
                    <div key={index} className="flex items-start p-2 bg-muted/30 rounded-md">
                      <div
                        className={`w-2 h-2 mt-1.5 rounded-full mr-2 ${
                          event.type === "holiday" ? "bg-red-500" : "bg-green-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-sm">{event.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.type === "holiday" ? "Holiday" : "Special Day"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Info className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                  <p className="text-muted-foreground">No events scheduled for this day</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 glass-effect mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              {events.length > 0 ? (
                <div className="space-y-2">
                  {events
                    .filter((event) => event.date >= new Date())
                    .slice(0, 5)
                    .map((event, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-1.5">
                        <div className="flex items-center">
                          <Badge
                            variant={event.type === "holiday" ? "destructive" : "outline"}
                            className="mr-2 text-xs"
                          >
                            {event.type === "holiday" ? "Holiday" : "Event"}
                          </Badge>
                          <span>{event.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {event.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No upcoming events</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

