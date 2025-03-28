"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useUser } from "@/components/user-provider"
import { getSchools } from "@/lib/schools"
import { Check, School } from "lucide-react"

export function SchoolSelector() {
  const { user, updateUser } = useUser()
  const [schools, setSchools] = useState([])
  const [selectedSchool, setSelectedSchool] = useState(user?.schoolId || "")
  const [scheduleType, setScheduleType] = useState("regular")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSchools = async () => {
      try {
        const schoolsList = await getSchools()
        setSchools(schoolsList)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load schools:", error)
        setIsLoading(false)
      }
    }

    loadSchools()
  }, [])

  const handleSchoolChange = (value) => {
    setSelectedSchool(value)
  }

  const handleScheduleTypeChange = (value) => {
    setScheduleType(value)
  }

  const handleSave = () => {
    if (selectedSchool) {
      updateUser({
        schoolId: selectedSchool,
      })
    }
  }

  return (
    <Card className="border-0 glass-effect">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <School className="h-5 w-5 mr-2" />
          School Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="school">Select Your School</Label>
              <Select value={selectedSchool} onValueChange={handleSchoolChange}>
                <SelectTrigger id="school">
                  <SelectValue placeholder="Choose a school" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Schedule Type</Label>
              <RadioGroup value={scheduleType} onValueChange={handleScheduleTypeChange} className="flex space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="regular" id="regular" />
                  <Label htmlFor="regular" className="text-sm">
                    Regular
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="block" id="block" />
                  <Label htmlFor="block" className="text-sm">
                    Block
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="text-sm">
                    Custom
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={handleSave} className="w-full">
              <Check className="h-4 w-4 mr-2" />
              Save School Selection
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

