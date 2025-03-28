"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/components/user-provider"
import { useTheme } from "next-themes"
import { Loader2, Upload, Palette } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SettingsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { user, updateUser, updateThemeSettings } = useUser()
  const { theme, setTheme } = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [schools, setSchools] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    schoolId: "",
    showMotivationalQuotes: true,
  })
  const [themeSettings, setThemeSettings] = useState({
    theme: "system",
    colorTheme: "blue",
    backgroundType: "none",
    customBackground: "",
  })
  const [previewBackground, setPreviewBackground] = useState("")

  useEffect(() => {
    // Fetch schools data
    const fetchSchools = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate loading the schools.json file
        const mockSchools = [
          { id: "high-school-1", name: "Central High School" },
          { id: "middle-school-1", name: "Westside Middle School" },
          { id: "elementary-1", name: "Sunshine Elementary" },
          { id: "custom", name: "Custom School" },
        ]
        setSchools(mockSchools)

        // Set form data from user context
        if (user) {
          setFormData({
            name: user.name || "",
            schoolId: user.schoolId || "",
            showMotivationalQuotes: user.showMotivationalQuotes !== undefined ? user.showMotivationalQuotes : true,
          })

          setThemeSettings({
            theme: user.themeSettings?.theme || "system",
            colorTheme: user.themeSettings?.colorTheme || "blue",
            backgroundType: user.themeSettings?.backgroundType || "none",
            customBackground: user.themeSettings?.customBackground || "",
          })

          if (user.themeSettings?.customBackground) {
            setPreviewBackground(user.themeSettings.customBackground)
          }
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load schools:", error)
        toast({
          title: "Error",
          description: "Failed to load schools data. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchSchools()
  }, [user, theme, toast])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleThemeChange = (value) => {
    setThemeSettings((prev) => ({ ...prev, theme: value }))
    setTheme(value)
  }

  const handleColorThemeChange = (value) => {
    setThemeSettings((prev) => ({ ...prev, colorTheme: value }))
  }

  const handleBackgroundTypeChange = (value) => {
    setThemeSettings((prev) => ({ ...prev, backgroundType: value }))

    // Clear custom background if type is none
    if (value === "none") {
      setThemeSettings((prev) => ({ ...prev, customBackground: "" }))
      setPreviewBackground("")
    }
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPreviewBackground(result)
        setThemeSettings((prev) => ({ ...prev, customBackground: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Update user context
    updateUser({
      name: formData.name,
      schoolId: formData.schoolId,
      showMotivationalQuotes: formData.showMotivationalQuotes,
    })

    // Update theme settings
    updateThemeSettings({
      theme: themeSettings.theme,
      colorTheme: themeSettings.colorTheme,
      backgroundType: themeSettings.backgroundType,
      customBackground: themeSettings.customBackground,
    })

    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })

    // Redirect to home page
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Card className="mx-auto max-w-4xl shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl">Settings</CardTitle>
          <CardDescription>Manage your preferences and account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="school">School</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 pt-4">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="transition-all duration-300"
                    />
                    <p className="text-sm text-muted-foreground">
                      This will be used for personalized greetings. Leave blank to use "Student".
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="showMotivationalQuotes">Motivational Quotes</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showMotivationalQuotes"
                        checked={formData.showMotivationalQuotes}
                        onCheckedChange={(checked) => handleSwitchChange("showMotivationalQuotes", checked)}
                      />
                      <Label htmlFor="showMotivationalQuotes">Show motivational quotes on the dashboard</Label>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="mt-4">
                    Save Changes
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme Mode</Label>
                    <Select value={themeSettings.theme} onValueChange={handleThemeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark (True Black)</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <RadioGroup
                      value={themeSettings.colorTheme}
                      onValueChange={handleColorThemeChange}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="blue" id="blue" className="border-blue-500" />
                        <Label htmlFor="blue" className="text-blue-500 font-medium">
                          Blue
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="purple" id="purple" className="border-purple-500" />
                        <Label htmlFor="purple" className="text-purple-500 font-medium">
                          Purple
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="green" id="green" className="border-green-500" />
                        <Label htmlFor="green" className="text-green-500 font-medium">
                          Green
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="orange" id="orange" className="border-orange-500" />
                        <Label htmlFor="orange" className="text-orange-500 font-medium">
                          Orange
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Background Type</Label>
                    <RadioGroup
                      value={themeSettings.backgroundType}
                      onValueChange={handleBackgroundTypeChange}
                      className="grid grid-cols-1 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none">No custom background</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="image" id="image" />
                        <Label htmlFor="image">Custom image background</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {themeSettings.backgroundType === "image" && (
                    <div className="space-y-2">
                      <Label>Upload Background Image</Label>
                      <div
                        className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-6 transition-all hover:border-primary/50 cursor-pointer"
                        onClick={triggerFileInput}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">
                          Click to upload an image, or drag and drop
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label>Preview</Label>
                  <div
                    className={`rounded-lg border-2 border-border h-64 flex items-center justify-center overflow-hidden ${themeSettings.colorTheme ? `theme-${themeSettings.colorTheme}` : ""}`}
                  >
                    {previewBackground ? (
                      <div
                        className="w-full h-full bg-cover bg-center flex items-center justify-center"
                        style={{ backgroundImage: `url(${previewBackground})` }}
                      >
                        <div className="bg-background/80 p-4 rounded-md">
                          <p className="text-foreground font-medium">Theme Preview</p>
                          <Button className="mt-2" size="sm">
                            Sample Button
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <Palette className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          {themeSettings.backgroundType === "image"
                            ? "Upload an image to see preview"
                            : "Standard theme preview"}
                        </p>
                        <Button className="mt-4" size="sm">
                          Sample Button
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button onClick={handleSubmit} size="lg" className="mt-4">
                Save Changes
              </Button>
            </TabsContent>

            <TabsContent value="school" className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Select value={formData.schoolId} onValueChange={(value) => handleSelectChange("schoolId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select school" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Select your school to load the appropriate bell schedule.
                  </p>
                </div>

                <Button onClick={handleSubmit} size="lg" className="mt-4">
                  Save Changes
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

