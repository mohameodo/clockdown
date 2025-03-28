"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Cloud, CloudRain, Sun, Loader2, MapPin, RefreshCw } from "lucide-react"
import { getSchoolData } from "@/lib/schools"

// Mock school locations
const schoolLocations = {
  "red-mountain-high": { city: "Mesa", country: "US", lat: 33.4152, lon: -111.5495 },
  "high-school-1": { city: "New York", country: "US", lat: 40.7128, lon: -74.006 },
  "middle-school-1": { city: "Chicago", country: "US", lat: 41.8781, lon: -87.6298 },
  "elementary-1": { city: "Los Angeles", country: "US", lat: 34.0522, lon: -118.2437 },
}

export function WeatherWidget({ schoolId, onWeatherUpdate = null }) {
  const { toast } = useToast()
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!schoolId) {
        setError("No school selected")
        setIsLoading(false)
        return
      }

      try {
        // Get school data to determine location
        const schoolData = await getSchoolData(schoolId)

        // Get location from our mock data or from school data
        const schoolLocation =
          schoolLocations[schoolId] ||
          (schoolData?.location
            ? {
                city: schoolData.location.city,
                country: schoolData.location.country,
                lat: schoolData.location.coordinates?.lat || 0,
                lon: schoolData.location.coordinates?.lon || 0,
              }
            : {
                city: "San Francisco",
                country: "US",
                lat: 37.7749,
                lon: -122.4194,
              })

        // In a real app, we would fetch from a weather API using the coordinates
        // For now, we'll use mock data
        fetchMockWeatherData(schoolLocation)
      } catch (error) {
        console.error("Error getting weather data:", error)
        setError("Unable to get weather data. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchWeatherData()
  }, [schoolId])

  const fetchMockWeatherData = (schoolLocation) => {
    // Simulate API call delay
    setTimeout(() => {
      // Mock weather data
      const mockWeather = {
        temperature: Math.floor(Math.random() * 30) + 10, // Random temp between 10-40°C
        condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 50) + 30, // Random humidity between 30-80%
        windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind speed between 5-25 km/h
      }

      setWeather(mockWeather)
      setLocation(schoolLocation)
      setIsLoading(false)

      // Pass weather data to parent component if callback provided
      if (onWeatherUpdate && typeof onWeatherUpdate === "function") {
        onWeatherUpdate(mockWeather)
      }
    }, 300) // Reduced delay for better performance
  }

  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate refreshing weather data
    setTimeout(() => {
      const updatedWeather = {
        ...weather,
        temperature: Math.floor(Math.random() * 30) + 10,
      }

      setWeather(updatedWeather)
      setIsLoading(false)

      // Pass updated weather data to parent component if callback provided
      if (onWeatherUpdate && typeof onWeatherUpdate === "function") {
        onWeatherUpdate(updatedWeather)
      }

      toast({
        title: "Weather updated",
        description: "Latest weather information has been loaded.",
      })
    }, 300) // Reduced delay for better performance
  }

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-5 w-5" />

    switch (weather.condition) {
      case "Sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "Rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "Cloudy":
      default:
        return <Cloud className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="border-0 glass-effect">
      <CardHeader className="pb-1 pt-3 px-3 sm:px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base">Weather</CardTitle>
          {!isLoading && (
            <Button variant="ghost" size="sm" onClick={handleRefresh} className="h-7 w-7 p-0">
              <RefreshCw className="h-3 w-3" />
              <span className="sr-only">Refresh weather</span>
            </Button>
          )}
        </div>
        {location && (
          <CardDescription className="flex items-center text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {location.city}, {location.country}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-3">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-2">
            <p className="text-muted-foreground text-xs">{error}</p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getWeatherIcon()}
              <div className="ml-3">
                <div className="text-xl font-bold">{weather.temperature}°C</div>
                <div className="text-xs text-muted-foreground">{weather.condition}</div>
              </div>
            </div>
            <div className="text-right text-xs">
              <div>Humidity: {weather.humidity}%</div>
              <div>Wind: {weather.windSpeed} km/h</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

