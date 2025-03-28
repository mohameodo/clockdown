// This file would normally fetch data from an API or database
// For this example, we'll use mock data

// Mock school data
const mockSchools = {
  "red-mountain-high": {
    id: "red-mountain-high",
    name: "Red Mountain High School",
    description: "A public high school with a diverse curriculum and flexible seat time.",
    location: {
      city: "Mesa",
      state: "AZ",
      country: "US",
      address: "7301 E Brown Rd, Mesa, AZ 85207",
      coordinates: {
        lat: 33.4152,
        lon: -111.5495,
      },
    },
    contact: {
      phone: "(480) 472-8000",
      email: "info@redmountainhigh.org",
      website: "https://www.mpsaz.org/rmhs",
    },
    about: {
      established: 1988,
      mascot: "Mountain Lions",
      colors: ["Red", "Black", "White"],
      mission: "To provide a comprehensive education that prepares students for college, career, and life success.",
    },
    scheduleType: "flex",
    schedules: {
      regular: {
        periods: [
          { name: "A", startTime: "07:15", endTime: "08:05" },
          { name: "1", startTime: "08:15", endTime: "09:17" },
          { name: "2", startTime: "09:23", endTime: "10:17" },
          { name: "3", startTime: "10:23", endTime: "11:17" },
          { name: "4", startTime: "11:23", endTime: "12:16" },
          { name: "5", startTime: "12:22", endTime: "13:16" },
          { name: "6", startTime: "13:22", endTime: "14:15" },
          { name: "8", startTime: "14:21", endTime: "15:15" },
          { name: "*9", startTime: "15:21", endTime: "16:15" },
        ],
      },
      friday: {
        periods: [
          { name: "A Period", startTime: "07:15", endTime: "08:05" },
          { name: "2nd Period", startTime: "08:15", endTime: "09:55" },
          { name: "6th Period", startTime: "10:05", endTime: "11:45" },
          { name: "Lunch Period", startTime: "11:45", endTime: "12:29" },
          { name: "8th Period", startTime: "12:39", endTime: "14:19" },
          { name: "7th Period", startTime: "14:29", endTime: "15:15" },
        ],
      },
      wednesday: {
        periods: [
          { name: "A", startTime: "07:15", endTime: "08:05" },
          { name: "1", startTime: "08:15", endTime: "08:46" },
          { name: "2", startTime: "08:51", endTime: "09:45" },
          { name: "4L", startTime: "09:51", endTime: "10:21" },
          { name: "3", startTime: "10:26", endTime: "11:19" },
          { name: "5", startTime: "11:24", endTime: "12:17" },
          { name: "6-7", startTime: "12:22", endTime: "13:15" },
        ],
      },
      "early-release": {
        periods: [
          { name: "A", startTime: "07:15", endTime: "08:05" },
          { name: "1", startTime: "08:15", endTime: "08:46" },
          { name: "2", startTime: "08:52", endTime: "09:23" },
          { name: "3", startTime: "09:29", endTime: "10:00" },
          { name: "4", startTime: "10:06", endTime: "10:37" },
          { name: "5", startTime: "10:43", endTime: "11:14" },
          { name: "6", startTime: "11:20", endTime: "11:51" },
          { name: "7A", startTime: "11:57", endTime: "12:38" },
          { name: "8", startTime: "12:44", endTime: "13:15" },
          { name: "*9", startTime: "13:21", endTime: "13:52" },
        ],
      },
    },
    calendar: {
      schoolYear: "2023-2024",
      holidays: [
        { name: "Labor Day", date: "2023-09-04" },
        { name: "Fall Break", startDate: "2023-10-09", endDate: "2023-10-13" },
        { name: "Veterans Day", date: "2023-11-10" },
        { name: "Thanksgiving Break", startDate: "2023-11-22", endDate: "2023-11-24" },
        { name: "Winter Break", startDate: "2023-12-25", endDate: "2024-01-05" },
        { name: "Martin Luther King Jr. Day", date: "2024-01-15" },
        { name: "Presidents Day", date: "2024-02-19" },
        { name: "Spring Break", startDate: "2024-03-11", endDate: "2024-03-15" },
        { name: "Spring Holiday", date: "2024-04-19" },
        { name: "Memorial Day", date: "2024-05-27" },
      ],
      specialDays: [
        { name: "First Day of School", date: "2023-08-07" },
        { name: "Last Day of School", date: "2024-05-23" },
        { name: "Parent-Teacher Conferences", date: "2023-10-05" },
        { name: "Parent-Teacher Conferences", date: "2024-02-22" },
      ],
    },
  },
  "central-high": {
    id: "central-high",
    name: "Central High School",
    description: "A comprehensive high school with a focus on college preparation and STEM education.",
    location: {
      city: "Phoenix",
      state: "AZ",
      country: "US",
      address: "4525 N Central Ave, Phoenix, AZ 85012",
      coordinates: {
        lat: 33.5021,
        lon: -112.0737,
      },
    },
    contact: {
      phone: "(602) 764-7500",
      email: "info@centralhigh.org",
      website: "https://www.phoenixunion.org/central",
    },
    about: {
      established: 1957,
      mascot: "Bobcats",
      colors: ["Blue", "Gold"],
      mission: "To provide a challenging academic environment that prepares students for college and career success.",
    },
    scheduleType: "block",
    schedules: {
      regular: {
        periods: [
          { name: "Period 1", startTime: "08:00", endTime: "09:30" },
          { name: "Period 2", startTime: "09:40", endTime: "11:10" },
          { name: "Lunch", startTime: "11:10", endTime: "11:50" },
          { name: "Period 3", startTime: "11:50", endTime: "13:20" },
          { name: "Period 4", startTime: "13:30", endTime: "15:00" },
        ],
      },
      wednesday: {
        periods: [
          { name: "Period 1", startTime: "08:00", endTime: "09:15" },
          { name: "Period 2", startTime: "09:25", endTime: "10:40" },
          { name: "Advisory", startTime: "10:50", endTime: "11:20" },
          { name: "Lunch", startTime: "11:20", endTime: "12:00" },
          { name: "Period 3", startTime: "12:00", endTime: "13:15" },
          { name: "Period 4", startTime: "13:25", endTime: "14:40" },
        ],
      },
    },
    calendar: {
      schoolYear: "2023-2024",
      holidays: [
        { name: "Labor Day", date: "2023-09-04" },
        { name: "Fall Break", startDate: "2023-10-09", endDate: "2023-10-13" },
        { name: "Veterans Day", date: "2023-11-10" },
        { name: "Thanksgiving Break", startDate: "2023-11-22", endDate: "2023-11-24" },
        { name: "Winter Break", startDate: "2023-12-25", endDate: "2024-01-05" },
        { name: "Martin Luther King Jr. Day", date: "2024-01-15" },
        { name: "Presidents Day", date: "2024-02-19" },
        { name: "Spring Break", startDate: "2024-03-11", endDate: "2024-03-15" },
        { name: "Spring Holiday", date: "2024-04-19" },
        { name: "Memorial Day", date: "2024-05-27" },
      ],
      specialDays: [
        { name: "First Day of School", date: "2023-08-07" },
        { name: "Last Day of School", date: "2024-05-23" },
      ],
    },
  },
  "westview-high": {
    id: "westview-high",
    name: "Westview High School",
    description: "A public high school with strong academic and athletic programs.",
    location: {
      city: "Avondale",
      state: "AZ",
      country: "US",
      address: "10850 W Garden Lakes Pkwy, Avondale, AZ 85392",
      coordinates: {
        lat: 33.4952,
        lon: -112.3026,
      },
    },
    contact: {
      phone: "(623) 478-4600",
      email: "info@westviewhs.org",
      website: "https://www.westviewhs.org",
    },
    about: {
      established: 1990,
      mascot: "Knights",
      colors: ["Navy", "Silver", "White"],
      mission: "To empower all students to become responsible citizens and lifelong learners in a global society.",
    },
    scheduleType: "regular",
    schedules: {
      regular: {
        periods: [
          { name: "Period 0", startTime: "07:00", endTime: "07:55" },
          { name: "Period 1", startTime: "08:00", endTime: "08:55" },
          { name: "Period 2", startTime: "09:00", endTime: "09:55" },
          { name: "Period 3", startTime: "10:00", endTime: "10:55" },
          { name: "Period 4", startTime: "11:00", endTime: "11:55" },
          { name: "Lunch", startTime: "11:55", endTime: "12:35" },
          { name: "Period 5", startTime: "12:40", endTime: "13:35" },
          { name: "Period 6", startTime: "13:40", endTime: "14:35" },
          { name: "Period 7", startTime: "14:40", endTime: "15:35" },
        ],
      },
      "early-release": {
        periods: [
          { name: "Period 0", startTime: "07:00", endTime: "07:40" },
          { name: "Period 1", startTime: "08:00", endTime: "08:35" },
          { name: "Period 2", startTime: "08:40", endTime: "09:15" },
          { name: "Period 3", startTime: "09:20", endTime: "09:55" },
          { name: "Period 4", startTime: "10:00", endTime: "10:35" },
          { name: "Period 5", startTime: "10:40", endTime: "11:15" },
          { name: "Period 6", startTime: "11:20", endTime: "11:55" },
          { name: "Period 7", startTime: "12:00", endTime: "12:35" },
        ],
      },
    },
    calendar: {
      schoolYear: "2023-2024",
      holidays: [
        { name: "Labor Day", date: "2023-09-04" },
        { name: "Fall Break", startDate: "2023-10-09", endDate: "2023-10-13" },
        { name: "Veterans Day", date: "2023-11-10" },
        { name: "Thanksgiving Break", startDate: "2023-11-22", endDate: "2023-11-24" },
        { name: "Winter Break", startDate: "2023-12-25", endDate: "2024-01-05" },
        { name: "Martin Luther King Jr. Day", date: "2024-01-15" },
        { name: "Presidents Day", date: "2024-02-19" },
        { name: "Spring Break", startDate: "2024-03-11", endDate: "2024-03-15" },
        { name: "Spring Holiday", date: "2024-04-19" },
        { name: "Memorial Day", date: "2024-05-27" },
      ],
      specialDays: [
        { name: "First Day of School", date: "2023-08-07" },
        { name: "Last Day of School", date: "2024-05-23" },
      ],
    },
  },
  "desert-vista": {
    id: "desert-vista",
    name: "Desert Vista High School",
    description: "A high-performing public high school with a focus on academics and the arts.",
    location: {
      city: "Phoenix",
      state: "AZ",
      country: "US",
      address: "16440 S 32nd St, Phoenix, AZ 85048",
      coordinates: {
        lat: 33.2977,
        lon: -112.0128,
      },
    },
    contact: {
      phone: "(480) 706-7900",
      email: "info@desertvista.org",
      website: "https://www.tempeunion.org/desertvista",
    },
    about: {
      established: 1996,
      mascot: "Thunder",
      colors: ["Teal", "Black", "Silver"],
      mission: "To provide an inclusive learning community that prepares every student for college, career, and life.",
    },
    scheduleType: "block",
    schedules: {
      regular: {
        periods: [
          { name: "Period 1/5", startTime: "08:20", endTime: "09:50" },
          { name: "Period 2/6", startTime: "09:57", endTime: "11:27" },
          { name: "Lunch", startTime: "11:27", endTime: "12:07" },
          { name: "Period 3/7", startTime: "12:14", endTime: "13:44" },
          { name: "Period 4/8", startTime: "13:51", endTime: "15:21" },
        ],
      },
      wednesday: {
        periods: [
          { name: "Period 1/5", startTime: "08:20", endTime: "09:35" },
          { name: "Period 2/6", startTime: "09:42", endTime: "10:57" },
          { name: "Advisory", startTime: "11:04", endTime: "11:34" },
          { name: "Lunch", startTime: "11:34", endTime: "12:14" },
          { name: "Period 3/7", startTime: "12:21", endTime: "13:36" },
          { name: "Period 4/8", startTime: "13:43", endTime: "14:58" },
        ],
      },
    },
    calendar: {
      schoolYear: "2023-2024",
      holidays: [
        { name: "Labor Day", date: "2023-09-04" },
        { name: "Fall Break", startDate: "2023-10-09", endDate: "2023-10-13" },
        { name: "Veterans Day", date: "2023-11-10" },
        { name: "Thanksgiving Break", startDate: "2023-11-22", endDate: "2023-11-24" },
        { name: "Winter Break", startDate: "2023-12-25", endDate: "2024-01-05" },
        { name: "Martin Luther King Jr. Day", date: "2024-01-15" },
        { name: "Presidents Day", date: "2024-02-19" },
        { name: "Spring Break", startDate: "2024-03-11", endDate: "2024-03-15" },
        { name: "Spring Holiday", date: "2024-04-19" },
        { name: "Memorial Day", date: "2024-05-27" },
      ],
      specialDays: [
        { name: "First Day of School", date: "2023-08-07" },
        { name: "Last Day of School", date: "2024-05-23" },
      ],
    },
  },
}

// Get all schools
export async function getSchools() {
  // In a real app, this would fetch from an API
  return Object.values(mockSchools)
}

// Get a specific school by ID
export async function getSchoolData(id: string) {
  // First check if it's a custom school in localStorage
  if (typeof window !== "undefined") {
    const customSchools = JSON.parse(localStorage.getItem("clockdown-custom-schools") || "[]")
    const customSchool = customSchools.find((school) => school.id === id)

    if (customSchool) {
      return customSchool
    }
  }

  // Otherwise, return the mock school data
  return mockSchools[id] || null
}

// Get the current period based on the current time
export function getCurrentPeriod(school, currentTime) {
  if (!school) return null

  // Determine which schedule to use based on the day of the week
  const dayOfWeek = currentTime.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
  let schedule = school.schedules.regular

  // Check for special schedules
  if (school.schedules[dayOfWeek]) {
    schedule = school.schedules[dayOfWeek]
  } else if (school.schedules.special && school.schedules.special[dayOfWeek]) {
    schedule = school.schedules.special[dayOfWeek]
  }

  // Get the current hour and minute
  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()
  const currentTimeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

  // Find the current period
  return schedule.periods.find((period) => {
    return currentTimeString >= period.startTime && currentTimeString < period.endTime
  })
}

// Get the next period based on the current time
export function getNextPeriod(school, currentTime) {
  if (!school) return null

  // Determine which schedule to use based on the day of the week
  const dayOfWeek = currentTime.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
  let schedule = school.schedules.regular

  // Check for special schedules
  if (school.schedules[dayOfWeek]) {
    schedule = school.schedules[dayOfWeek]
  } else if (school.schedules.special && school.schedules.special[dayOfWeek]) {
    schedule = school.schedules.special[dayOfWeek]
  }

  // Get the current hour and minute
  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()
  const currentTimeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

  // Find the next period
  return schedule.periods.find((period) => {
    return currentTimeString < period.startTime
  })
}

// Get upcoming periods
export function getUpcomingPeriods(school, currentTime, limit = 5) {
  if (!school) return []

  // Determine which schedule to use based on the day of the week
  const dayOfWeek = currentTime.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
  let schedule = school.schedules.regular

  // Check for special schedules
  if (school.schedules[dayOfWeek]) {
    schedule = school.schedules[dayOfWeek]
  } else if (school.schedules.special && school.schedules.special[dayOfWeek]) {
    schedule = school.schedules.special[dayOfWeek]
  }

  // Get the current hour and minute
  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()
  const currentTimeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

  // Find upcoming periods
  const upcoming = schedule.periods.filter((period) => {
    return currentTimeString < period.endTime
  })

  // If we don't have enough periods for today, add periods from tomorrow
  if (upcoming.length < limit) {
    const tomorrow = new Date(currentTime)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowDay = tomorrow.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()

    let tomorrowSchedule = school.schedules.regular

    // Check for special schedules for tomorrow
    if (school.schedules[tomorrowDay]) {
      tomorrowSchedule = school.schedules[tomorrowDay]
    } else if (school.schedules.special && school.schedules.special[tomorrowDay]) {
      tomorrowSchedule = school.schedules.special[tomorrowDay]
    }

    // Add periods from tomorrow until we reach the limit
    const tomorrowPeriods = tomorrowSchedule.periods.slice(0, limit - upcoming.length)

    // Add a day gap indicator
    if (tomorrowPeriods.length > 0) {
      upcoming.push({ name: "--- Next Day ---", startTime: "00:00", endTime: "00:00", isDayGap: true })
      upcoming.push(...tomorrowPeriods)
    }
  }

  return upcoming.slice(0, limit + 1) // +1 to account for possible day gap
}

// Get school calendar events
export function getSchoolCalendarEvents(school, startDate, endDate) {
  if (!school || !school.calendar) return []

  const events = []

  // Add holidays
  if (school.calendar.holidays) {
    school.calendar.holidays.forEach((holiday) => {
      if (holiday.date) {
        events.push({
          name: holiday.name,
          date: new Date(holiday.date),
          type: "holiday",
        })
      } else if (holiday.startDate && holiday.endDate) {
        // Create an event for each day in the range
        const start = new Date(holiday.startDate)
        const end = new Date(holiday.endDate)

        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
          events.push({
            name: holiday.name,
            date: new Date(date),
            type: "holiday",
          })
        }
      }
    })
  }

  // Add special days
  if (school.calendar.specialDays) {
    school.calendar.specialDays.forEach((specialDay) => {
      events.push({
        name: specialDay.name,
        date: new Date(specialDay.date),
        type: "special",
      })
    })
  }

  // Filter events by date range if provided
  if (startDate && endDate) {
    return events.filter((event) => event.date >= new Date(startDate) && event.date <= new Date(endDate))
  }

  return events
}

