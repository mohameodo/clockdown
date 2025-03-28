"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/components/user-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, School, User, ArrowRight, Check } from "lucide-react"

export function OnboardingModal() {
  const router = useRouter()
  const { user, isFirstVisit, updateUser, setFirstVisit } = useUser()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    schoolId: "",
    customSchool: {
      name: "",
      scheduleType: "regular",
    },
  })
  const [schools, setSchools] = useState([])
  const [activeTab, setActiveTab] = useState("existing")

  const hasCompletedSetup = () => {
    return user && user.name && user.schoolId;
  };

  const checkOnboardingStatus = () => {
    try {
      return localStorage.getItem('clockdown-device-onboarding-complete') === 'true';
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const hasCompletedOnboarding = checkOnboardingStatus();
    const userHasData = hasCompletedSetup();

    if (!hasCompletedOnboarding && isFirstVisit && !userHasData) {
      setOpen(true);

      // Load mock schools data
      const mockSchools = [{ id: "red-mountain-high", name: "Red Mountain High School" }];
      setSchools(mockSchools);
    } else {
      // Ensure modal stays closed if user has completed setup
      setOpen(false);
      // Mark first visit as complete if user has data
      if (userHasData) {
        setFirstVisit(false);
      }
    }

    return () => {
      // Cleanup function
      if (open) setOpen(false);
    };
  }, [isFirstVisit, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCustomSchoolChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      customSchool: {
        ...prev.customSchool,
        [name]: value,
      },
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCustomSchoolTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      customSchool: {
        ...prev.customSchool,
        scheduleType: value,
      },
    }))
  }

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    } else {
      // Mark device-specific onboarding as completed
      localStorage.setItem('clockdown-device-onboarding-complete', 'true')

      // Save user data
      if (activeTab === "existing") {
        updateUser({
          name: formData.name || "Student",
          schoolId: formData.schoolId,
          showMotivationalQuotes: true,
          showWeatherInCountdown: true,
          widgetEnabled: false,
        })
      } else {
        // Create custom school and save it to localStorage
        const customSchoolId = `custom-${Date.now()}`
        const customSchool = {
          id: customSchoolId,
          name: formData.customSchool.name,
          description: "Custom school created by user",
          scheduleType: formData.customSchool.scheduleType,
          schedules: {
            regular: {
              periods: [
                { name: "Period 1", startTime: "08:00", endTime: "08:50" },
                { name: "Period 2", startTime: "09:00", endTime: "09:50" },
                { name: "Period 3", startTime: "10:00", endTime: "10:50" },
                { name: "Lunch", startTime: "11:00", endTime: "11:30" },
                { name: "Period 4", startTime: "11:40", endTime: "12:30" },
                { name: "Period 5", startTime: "12:40", endTime: "13:30" },
                { name: "Period 6", startTime: "13:40", endTime: "14:30" },
              ],
            },
          },
          about: {
            established: new Date().getFullYear(),
            mascot: "Custom Mascot",
            colors: ["Blue", "White"],
            mission: "Custom school mission statement",
          },
          location: {
            city: "Your City",
            state: "Your State",
            country: "Your Country",
          },
          contact: {
            email: "school@example.com",
          },
        }

        // Save custom school to localStorage
        const customSchools = JSON.parse(localStorage.getItem("clockdown-custom-schools") || "[]")
        customSchools.push(customSchool)
        localStorage.setItem("clockdown-custom-schools", JSON.stringify(customSchools))

        // Update user with custom school
        updateUser({
          name: formData.name || "Student",
          schoolId: customSchoolId,
          showMotivationalQuotes: true,
          showWeatherInCountdown: true,
          widgetEnabled: false,
        })
      }

      // Mark first visit as complete
      setFirstVisit(false)

      // Close the modal
      setOpen(false)

      // Redirect to home page
      router.push("/")
    }
  }

  const handleSkip = () => {
    // Mark device-specific onboarding as completed
    localStorage.setItem('clockdown-device-onboarding-complete', 'true')

    // Set default values
    updateUser({
      name: "Student",
      schoolId: schools[0]?.id || "high-school-1",
      showMotivationalQuotes: true,
      showWeatherInCountdown: true,
      widgetEnabled: false,
    })

    // Mark first visit as complete
    setFirstVisit(false)

    // Close the modal
    setOpen(false)
  }

  const getStepIcon = (stepNumber) => {
    if (stepNumber === 1) {
      return <User className="h-6 w-6 text-primary" />
    } else {
      return <School className="h-6 w-6 text-primary" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden glass-effect">
        <DialogTitle className="sr-only">Welcome  to Clockdown - Setup Wizard</DialogTitle>
        <div className="bg-primary text-primary-foreground p-6">
          <div className="flex items-center mb-4">
            <Clock className="h-8 w-8 mr-2" />
            <h2 className="text-2xl font-bold">Welcome to Clockdown</h2>
          </div>
          <p className="opacity-90">
            Let's set up your profile to get the most out of your school bell countdown experience.
          </p>

          <div className="flex items-center justify-between mt-6">
            <div className={`flex items-center ${step === 1 ? "text-white" : "text-white/60"}`}>
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === 1 ? "border-white bg-white/20" : "border-white/60"} mr-2`}
              >
                1
              </div>
              <span>Your Profile</span>
            </div>
            <ArrowRight className="h-4 w-4 text-white/60 mx-2" />
            <div className={`flex items-center ${step === 2 ? "text-white" : "text-white/60"}`}>
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === 2 ? "border-white bg-white/20" : "border-white/60"} mr-2`}
              >
                2
              </div>
              <span>School Setup</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            {getStepIcon(step)}
            <h3 className="text-xl font-semibold ml-2">
              {step === 1 ? "Tell us about yourself" : "Choose your school"}
            </h3>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  What's your name?
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="h-12 text-base"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-muted-foreground">
                  This will be used for personalized greetings. Leave blank to use "Student".
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Tabs defaultValue="existing" onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12">
                  <TabsTrigger value="existing" className="text-base">
                    Existing School
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="text-base">
                    Custom School
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="existing" className="pt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="school" className="text-base">
                        Select your school
                      </Label>
                      <Select
                        value={formData.schoolId}
                        onValueChange={(value) => handleSelectChange("schoolId", value)}
                      >
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Choose a school" />
                        </SelectTrigger>
                        <SelectContent>
                          {schools.map((school) => (
                            <SelectItem key={school.id} value={school.id} className="text-base">
                              {school.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="pt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customSchoolName" className="text-base">
                        School Name
                      </Label>
                      <Input
                        id="customSchoolName"
                        name="name"
                        placeholder="Enter your school name"
                        className="h-12 text-base"
                        value={formData.customSchool.name}
                        onChange={handleCustomSchoolChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scheduleType" className="text-base">
                        Schedule Type
                      </Label>
                      <Select value={formData.customSchool.scheduleType} onValueChange={handleCustomSchoolTypeChange}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select schedule type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular" className="text-base">
                            Regular
                          </SelectItem>
                          <SelectItem value="block" className="text-base">
                            Block
                          </SelectItem>
                          <SelectItem value="custom" className="text-base">
                            Custom
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        You can customize your schedule details later in Settings.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        <DialogFooter className="bg-muted/50 p-6">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={handleSkip} className="h-12">
                Skip
              </Button>
              <Button onClick={handleNext} size="lg" className="h-12 px-8">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep(1)} className="h-12">
                Back
              </Button>
              <Button onClick={handleNext} size="lg" className="h-12 px-8 bg-primary">
                Finish Setup
                <Check className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

