import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSchoolData, getSchoolCalendarEvents } from "@/lib/schools"
import { Calendar, Info, MapPin, Phone, Mail, Globe } from "lucide-react"
import Link from "next/link"

export async function generateMetadata({ params }) {
  const school = await getSchoolData(params.id)

  return {
    title: `${school.name} - Clockdown`,
    description: `Bell schedule and information for ${school.name}`,
    openGraph: {
      title: `${school.name} - Clockdown`,
      description: `Bell schedule and information for ${school.name}`,
    },
  }
}

export default async function SchoolPage({ params }) {
  const school = await getSchoolData(params.id)

  // Get upcoming calendar events
  const today = new Date()
  const endDate = new Date(today)
  endDate.setMonth(today.getMonth() + 2) // Get events for the next 2 months

  const calendarEvents = school.calendar ? getSchoolCalendarEvents(school, today, endDate) : []

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <Card className="mx-auto border-0 card-no-shadow transparent-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{school.name}</CardTitle>
          <CardDescription>{school.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="schedule" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="schedule">Bell Schedule</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-4">
              <Tabs defaultValue="regular">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="regular">Regular Schedule</TabsTrigger>
                  {(school.schedules.wednesday ||
                    school.schedules["early-release"] ||
                    (school.schedules.special && Object.keys(school.schedules.special).length > 0)) && (
                    <TabsTrigger value="special">Special Schedules</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="regular" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3">Period</TableHead>
                        <TableHead className="w-1/3">Start Time</TableHead>
                        <TableHead className="w-1/3">End Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {school.schedules.regular.periods.map((period) => (
                        <TableRow key={period.name}>
                          <TableCell className="font-medium">{period.name}</TableCell>
                          <TableCell>{period.startTime}</TableCell>
                          <TableCell>{period.endTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                {(school.schedules.wednesday ||
                  school.schedules["early-release"] ||
                  (school.schedules.special && Object.keys(school.schedules.special).length > 0)) && (
                  <TabsContent value="special" className="mt-4">
                    <Tabs
                      defaultValue={
                        school.schedules.wednesday
                          ? "wednesday"
                          : school.schedules["early-release"]
                            ? "early-release"
                            : school.schedules.special
                              ? Object.keys(school.schedules.special)[0]
                              : ""
                      }
                    >
                      <TabsList className="mb-4 flex flex-wrap">
                        {school.schedules.wednesday && <TabsTrigger value="wednesday">Wednesday</TabsTrigger>}
                        {school.schedules["early-release"] && (
                          <TabsTrigger value="early-release">Early Release</TabsTrigger>
                        )}
                        {school.schedules.special &&
                          Object.keys(school.schedules.special).map((day) => (
                            <TabsTrigger key={day} value={day}>
                              {day.charAt(0).toUpperCase() + day.slice(1)}
                            </TabsTrigger>
                          ))}
                      </TabsList>

                      {school.schedules.wednesday && (
                        <TabsContent value="wednesday">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Period</TableHead>
                                <TableHead>Start Time</TableHead>
                                <TableHead>End Time</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {school.schedules.wednesday.periods.map((period) => (
                                <TableRow key={period.name}>
                                  <TableCell className="font-medium">{period.name}</TableCell>
                                  <TableCell>{period.startTime}</TableCell>
                                  <TableCell>{period.endTime}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TabsContent>
                      )}

                      {school.schedules["early-release"] && (
                        <TabsContent value="early-release">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Period</TableHead>
                                <TableHead>Start Time</TableHead>
                                <TableHead>End Time</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {school.schedules["early-release"].periods.map((period) => (
                                <TableRow key={period.name}>
                                  <TableCell className="font-medium">{period.name}</TableCell>
                                  <TableCell>{period.startTime}</TableCell>
                                  <TableCell>{period.endTime}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TabsContent>
                      )}

                      {school.schedules.special &&
                        Object.entries(school.schedules.special).map(([day, schedule]) => (
                          <TabsContent key={day} value={day}>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Period</TableHead>
                                  <TableHead>Start Time</TableHead>
                                  <TableHead>End Time</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {schedule.periods.map((period) => (
                                  <TableRow key={period.name}>
                                    <TableCell className="font-medium">{period.name}</TableCell>
                                    <TableCell>{period.startTime}</TableCell>
                                    <TableCell>{period.endTime}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>
                        ))}
                    </Tabs>
                  </TabsContent>
                )}
              </Tabs>
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    School Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    {school.about && (
                      <>
                        <p>
                          <span className="font-medium">Established:</span> {school.about.established}
                        </p>
                        <p>
                          <span className="font-medium">Mascot:</span> {school.about.mascot}
                        </p>
                        <p>
                          <span className="font-medium">Colors:</span> {school.about.colors?.join(", ")}
                        </p>
                        {school.about.mission && (
                          <div>
                            <p className="font-medium">Mission:</p>
                            <p className="text-muted-foreground">{school.about.mission}</p>
                          </div>
                        )}
                      </>
                    )}
                    <p>
                      <span className="font-medium">Schedule Type:</span> {school.scheduleType}
                    </p>
                    <p>
                      <span className="font-medium">Total Periods:</span> {school.schedules.regular.periods.length}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Contact & Location
                  </h3>
                  <div className="space-y-2 text-sm">
                    {school.location && (
                      <>
                        <p>
                          <span className="font-medium">Address:</span> {school.location.address}
                        </p>
                        <p>
                          <span className="font-medium">City:</span> {school.location.city}, {school.location.state}
                        </p>
                      </>
                    )}
                    {school.contact && (
                      <>
                        <p className="flex items-center">
                          <Phone className="h-3 w-3 mr-2" />
                          <span className="font-medium mr-1">Phone:</span> {school.contact.phone}
                        </p>
                        <p className="flex items-center">
                          <Mail className="h-3 w-3 mr-2" />
                          <span className="font-medium mr-1">Email:</span> {school.contact.email}
                        </p>
                        {school.contact.website && (
                          <p className="flex items-center">
                            <Globe className="h-3 w-3 mr-2" />
                            <span className="font-medium mr-1">Website:</span>
                            <Link
                              href={school.contact.website}
                              target="_blank"
                              className="text-primary hover:underline truncate"
                            >
                              {school.contact.website.replace(/^https?:\/\//, "")}
                            </Link>
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  School Calendar
                </h3>

                {school.calendar ? (
                  <div>
                    <p className="text-sm mb-3">
                      <span className="font-medium">School Year:</span> {school.calendar.schoolYear || "Current"}
                    </p>

                    <h4 className="font-medium text-sm mb-2">Upcoming Events:</h4>
                    {calendarEvents.length > 0 ? (
                      <div className="space-y-2">
                        {calendarEvents.map((event, index) => (
                          <div key={index} className="flex items-center p-2 bg-muted/30 rounded-md text-sm">
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${event.type === "holiday" ? "bg-red-500" : "bg-green-500"}`}
                            ></div>
                            <div className="flex-1">
                              <p className="font-medium">{event.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {event.date.toLocaleDateString(undefined, {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No upcoming events in the next 2 months.</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Calendar information not available for this school.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

