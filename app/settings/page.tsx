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
import {
  Loader2,
  Upload,
  Palette,
  Bell,
  Accessibility,
  User2,
  School,
  Clock,
  Award,
  Sparkles,
  Bookmark,
  Flame,
  Trophy,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { user, updateUser, updateThemeSettings, updateNotificationSettings, updateAccessibilitySettings } = useUser()
  const { theme, setTheme } = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [schools, setSchools] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    schoolId: "",
    showMotivationalQuotes: true,
    nickname: "",
    avatar: "",
    bio: "",
    displayName: "",
    preferredLanguage: "english",
    timeFormat: "12h",
    dateFormat: "mm/dd/yyyy",
    showWeatherInCountdown: true,
  })
  const [themeSettings, setThemeSettings] = useState({
    theme: "system",
    colorTheme: "blue",
    backgroundType: "none",
    customBackground: "",
    darkMode: "true-black",
    fontStyle: "default",
    animationLevel: "full",
    countdownStyle: "default",
    borderRadius: "default",
    glassMorphismLevel: "medium",
    customAccentColor: "",
    useCustomAccentColor: false,
  })
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: false,
    bellNotifications: true,
    calendarReminders: true,
    scheduleChanges: true,
    customAlarms: false,
    soundEffects: true,
    vibration: true,
    notificationTime: "1",
    streakReminders: true,
    dailyMotivation: false,
    notificationSound: "default",
    quietHours: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
  })
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    screenReader: false,
    offlineMode: false,
    lowDataMode: false,
    colorBlindMode: "none",
    keyboardShortcuts: true,
    textToSpeech: false,
    focusMode: false,
  })
  const [previewBackground, setPreviewBackground] = useState("")
  const [achievementSettings, setAchievementSettings] = useState({
    showAchievements: true,
    publicAchievements: false,
    achievementNotifications: true,
    shareOnSocialMedia: false,
  })

  useEffect(() => {
    // Fetch schools data
    const fetchSchools = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate loading the schools.json file
        const mockSchools = [
          { id: "red-mountain-high", name: "Red Mountain High School" },
          { id: "custom", name: "Custom School" },
        ]
        setSchools(mockSchools)

        // Set form data from user context
        if (user) {
          setFormData({
            name: user.name || "",
            schoolId: user.schoolId || "",
            showMotivationalQuotes: user.showMotivationalQuotes !== undefined ? user.showMotivationalQuotes : true,
            nickname: user.nickname || "",
            avatar: user.avatar || "",
            bio: user.bio || "",
            displayName: user.displayName || user.name || "",
            preferredLanguage: user.preferredLanguage || "english",
            timeFormat: user.timeFormat || "12h",
            dateFormat: user.dateFormat || "mm/dd/yyyy",
            showWeatherInCountdown: user.showWeatherInCountdown !== undefined ? user.showWeatherInCountdown : true,
          })

          setThemeSettings({
            theme: user.themeSettings?.theme || "system",
            colorTheme: user.themeSettings?.colorTheme || "blue",
            backgroundType: user.themeSettings?.backgroundType || "none",
            customBackground: user.themeSettings?.customBackground || "",
            darkMode: user.themeSettings?.darkMode || "true-black",
            fontStyle: user.themeSettings?.fontStyle || "default",
            animationLevel: user.themeSettings?.animationLevel || "full",
            countdownStyle: user.themeSettings?.countdownStyle || "default",
            borderRadius: user.themeSettings?.borderRadius || "default",
            glassMorphismLevel: user.themeSettings?.glassMorphismLevel || "medium",
            customAccentColor: user.themeSettings?.customAccentColor || "",
            useCustomAccentColor: user.themeSettings?.useCustomAccentColor || false,
          })

          setNotificationSettings({
            enabled: user.notificationSettings?.enabled || false,
            bellNotifications:
              user.notificationSettings?.bellNotifications !== undefined
                ? user.notificationSettings.bellNotifications
                : true,
            calendarReminders:
              user.notificationSettings?.calendarReminders !== undefined
                ? user.notificationSettings.calendarReminders
                : true,
            scheduleChanges:
              user.notificationSettings?.scheduleChanges !== undefined
                ? user.notificationSettings.scheduleChanges
                : true,
            customAlarms: user.notificationSettings?.customAlarms || false,
            soundEffects:
              user.notificationSettings?.soundEffects !== undefined ? user.notificationSettings.soundEffects : true,
            vibration: user.notificationSettings?.vibration !== undefined ? user.notificationSettings.vibration : true,
            notificationTime: user.notificationSettings?.notificationTime || "1",
            streakReminders:
              user.notificationSettings?.streakReminders !== undefined
                ? user.notificationSettings.streakReminders
                : true,
            dailyMotivation: user.notificationSettings?.dailyMotivation || false,
            notificationSound: user.notificationSettings?.notificationSound || "default",
            quietHours: user.notificationSettings?.quietHours || false,
            quietHoursStart: user.notificationSettings?.quietHoursStart || "22:00",
            quietHoursEnd: user.notificationSettings?.quietHoursEnd || "07:00",
          })

          setAccessibilitySettings({
            highContrast: user.accessibilitySettings?.highContrast || false,
            largeText: user.accessibilitySettings?.largeText || false,
            reduceMotion: user.accessibilitySettings?.reduceMotion || false,
            screenReader: user.accessibilitySettings?.screenReader || false,
            offlineMode: user.accessibilitySettings?.offlineMode || false,
            lowDataMode: user.accessibilitySettings?.lowDataMode || false,
            colorBlindMode: user.accessibilitySettings?.colorBlindMode || "none",
            keyboardShortcuts:
              user.accessibilitySettings?.keyboardShortcuts !== undefined
                ? user.accessibilitySettings.keyboardShortcuts
                : true,
            textToSpeech: user.accessibilitySettings?.textToSpeech || false,
            focusMode: user.accessibilitySettings?.focusMode || false,
          })

          setAchievementSettings({
            showAchievements:
              user.achievementSettings?.showAchievements !== undefined
                ? user.achievementSettings.showAchievements
                : true,
            publicAchievements: user.achievementSettings?.publicAchievements || false,
            achievementNotifications:
              user.achievementSettings?.achievementNotifications !== undefined
                ? user.achievementSettings.achievementNotifications
                : true,
            shareOnSocialMedia: user.achievementSettings?.shareOnSocialMedia || false,
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

  const handleNotificationSwitchChange = (name, checked) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAccessibilitySwitchChange = (name, checked) => {
    setAccessibilitySettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAchievementSwitchChange = (name, checked) => {
    setAchievementSettings((prev) => ({ ...prev, [name]: checked }))
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
      nickname: formData.nickname,
      avatar: formData.avatar,
      bio: formData.bio,
      displayName: formData.displayName,
      preferredLanguage: formData.preferredLanguage,
      timeFormat: formData.timeFormat,
      dateFormat: formData.dateFormat,
      showWeatherInCountdown: formData.showWeatherInCountdown,
      achievementSettings: achievementSettings,
    })

    // Update theme settings
    updateThemeSettings({
      theme: themeSettings.theme,
      colorTheme: themeSettings.colorTheme,
      backgroundType: themeSettings.backgroundType,
      customBackground: themeSettings.customBackground,
      darkMode: themeSettings.darkMode,
      fontStyle: themeSettings.fontStyle,
      animationLevel: themeSettings.animationLevel,
      countdownStyle: themeSettings.countdownStyle,
      borderRadius: themeSettings.borderRadius,
      glassMorphismLevel: themeSettings.glassMorphismLevel,
      customAccentColor: themeSettings.customAccentColor,
      useCustomAccentColor: themeSettings.useCustomAccentColor,
    })

    // Update notification settings
    updateNotificationSettings(notificationSettings)

    // Update accessibility settings
    updateAccessibilitySettings(accessibilitySettings)

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
      <Card className="mx-auto max-w-4xl shadow-lg glass-effect">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl">Settings</CardTitle>
          <CardDescription>Manage your preferences and account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="profile" className="flex items-center space-x-1">
                <User2 className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-1">
                <Palette className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-1">
                <Bell className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="flex items-center space-x-1">
                <Accessibility className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Accessibility</span>
              </TabsTrigger>
              <TabsTrigger value="school" className="flex items-center space-x-1">
                <School className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">School</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center space-x-1">
                <Award className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Achievements</span>
              </TabsTrigger>
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
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      name="displayName"
                      placeholder="How you want to be addressed"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="transition-all duration-300"
                    />
                    <p className="text-sm text-muted-foreground">This is how you'll be addressed throughout the app.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname">Nickname (Optional)</Label>
                    <Input
                      id="nickname"
                      name="nickname"
                      placeholder="Your nickname"
                      value={formData.nickname}
                      onChange={handleInputChange}
                      className="transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="A short bio about yourself"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="transition-all duration-300 min-h-[100px]"
                    />
                    <p className="text-sm text-muted-foreground">This will be shown on your profile page.</p>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Preferences</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredLanguage">Language</Label>
                        <Select
                          value={formData.preferredLanguage}
                          onValueChange={(value) => handleSelectChange("preferredLanguage", value)}
                        >
                          <SelectTrigger id="preferredLanguage">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeFormat">Time Format</Label>
                        <Select
                          value={formData.timeFormat}
                          onValueChange={(value) => handleSelectChange("timeFormat", value)}
                        >
                          <SelectTrigger id="timeFormat">
                            <SelectValue placeholder="Select time format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                            <SelectItem value="24h">24-hour (13:30)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select
                          value={formData.dateFormat}
                          onValueChange={(value) => handleSelectChange("dateFormat", value)}
                        >
                          <SelectTrigger id="dateFormat">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Display Options</h3>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showMotivationalQuotes" className="font-medium">
                            Motivational Quotes
                          </Label>
                          <p className="text-xs text-muted-foreground">Show motivational quotes on the dashboard</p>
                        </div>
                        <Switch
                          id="showMotivationalQuotes"
                          checked={formData.showMotivationalQuotes}
                          onCheckedChange={(checked) => handleSwitchChange("showMotivationalQuotes", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showWeatherInCountdown" className="font-medium">
                            Weather in Countdown
                          </Label>
                          <p className="text-xs text-muted-foreground">Show weather information in the countdown</p>
                        </div>
                        <Switch
                          id="showWeatherInCountdown"
                          checked={formData.showWeatherInCountdown}
                          onCheckedChange={(checked) => handleSwitchChange("showWeatherInCountdown", checked)}
                        />
                      </div>
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
                    <Label>Dark Mode Style</Label>
                    <RadioGroup
                      value={themeSettings.darkMode}
                      onValueChange={(value) => setThemeSettings((prev) => ({ ...prev, darkMode: value }))}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true-black" id="true-black" />
                        <Label htmlFor="true-black" className="font-medium">
                          True Black
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark-gray" id="dark-gray" />
                        <Label htmlFor="dark-gray" className="font-medium">
                          Dark Gray
                        </Label>
                      </div>
                    </RadioGroup>
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="useCustomAccentColor">Use Custom Accent Color</Label>
                      <Switch
                        id="useCustomAccentColor"
                        checked={themeSettings.useCustomAccentColor}
                        onCheckedChange={(checked) =>
                          setThemeSettings((prev) => ({ ...prev, useCustomAccentColor: checked }))
                        }
                      />
                    </div>

                    {themeSettings.useCustomAccentColor && (
                      <div className="mt-2">
                        <Label htmlFor="customAccentColor">Custom Accent Color</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            id="customAccentColor"
                            type="color"
                            value={themeSettings.customAccentColor || "#3b82f6"}
                            onChange={(e) =>
                              setThemeSettings((prev) => ({ ...prev, customAccentColor: e.target.value }))
                            }
                            className="w-12 h-8 p-1"
                          />
                          <Input
                            type="text"
                            value={themeSettings.customAccentColor || "#3b82f6"}
                            onChange={(e) =>
                              setThemeSettings((prev) => ({ ...prev, customAccentColor: e.target.value }))
                            }
                            placeholder="#3b82f6"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Font Style</Label>
                    <Select
                      value={themeSettings.fontStyle}
                      onValueChange={(value) => setThemeSettings((prev) => ({ ...prev, fontStyle: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="monospace">Monospace</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="handwritten">Handwritten</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Countdown Style</Label>
                    <Select
                      value={themeSettings.countdownStyle}
                      onValueChange={(value) => setThemeSettings((prev) => ({ ...prev, countdownStyle: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select countdown style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="digital">Digital Clock</SelectItem>
                        <SelectItem value="flip">Flip Clock</SelectItem>
                        <SelectItem value="circular">Circular Progress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Border Radius</Label>
                    <Select
                      value={themeSettings.borderRadius}
                      onValueChange={(value) => setThemeSettings((prev) => ({ ...prev, borderRadius: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select border radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (Square)</SelectItem>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="full">Full (Rounded)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Glass Morphism Level</Label>
                    <Select
                      value={themeSettings.glassMorphismLevel}
                      onValueChange={(value) => setThemeSettings((prev) => ({ ...prev, glassMorphismLevel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select glass effect level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="heavy">Heavy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Animation Level</Label>
                    <Select
                      value={themeSettings.animationLevel}
                      onValueChange={(value) => setThemeSettings((prev) => ({ ...prev, animationLevel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select animation level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Animations</SelectItem>
                        <SelectItem value="reduced">Reduced Animations</SelectItem>
                        <SelectItem value="none">No Animations</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gradient" id="gradient" />
                        <Label htmlFor="gradient">Gradient background</Label>
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

                  <div className="space-y-2 mt-4">
                    <Label>UI Element Spacing</Label>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Compact</span>
                          <span className="text-xs">Spacious</span>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={10} className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSubmit} size="lg" className="mt-4">
                Save Changes
              </Button>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notificationsEnabled" className="text-base font-medium">
                      Enable Notifications
                    </Label>
                    <Switch
                      id="notificationsEnabled"
                      checked={notificationSettings.enabled}
                      onCheckedChange={(checked) => handleNotificationSwitchChange("enabled", checked)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about bell changes, upcoming events, and more.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Types</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="bellNotifications" className="font-medium">
                          Bell Notifications
                        </Label>
                        <p className="text-xs text-muted-foreground">Notify when periods start or end</p>
                      </div>
                      <Switch
                        id="bellNotifications"
                        checked={notificationSettings.bellNotifications}
                        onCheckedChange={(checked) => handleNotificationSwitchChange("bellNotifications", checked)}
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="calendarReminders" className="font-medium">
                          Calendar Reminders
                        </Label>
                        <p className="text-xs text-muted-foreground">Remind about upcoming events</p>
                      </div>
                      <Switch
                        id="calendarReminders"
                        checked={notificationSettings.calendarReminders}
                        onCheckedChange={(checked) => handleNotificationSwitchChange("calendarReminders", checked)}
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="scheduleChanges" className="font-medium">
                          Schedule Changes
                        </Label>
                        <p className="text-xs text-muted-foreground">Alert when school schedule changes</p>
                      </div>
                      <Switch
                        id="scheduleChanges"
                        checked={notificationSettings.scheduleChanges}
                        onCheckedChange={(checked) => handleNotificationSwitchChange("scheduleChanges", checked)}
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="customAlarms" className="font-medium">
                          Custom Alarms
                        </Label>
                        <p className="text-xs text-muted-foreground">Set your own notification times</p>
                      </div>
                      <Switch
                        id="customAlarms"
                        checked={notificationSettings.customAlarms}
                        onCheckedChange={(checked) => handleNotificationSwitchChange("customAlarms", checked)}
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="streakReminders" className="font-medium">
                          Streak Reminders
                        </Label>
                        <p className="text-xs text-muted-foreground">Remind you to maintain your daily streak</p>
                      </div>
                      <Switch
                        id="streakReminders"
                        checked={notificationSettings.streakReminders}
                        onCheckedChange={(checked) => handleNotificationSwitchChange("streakReminders", checked)}
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dailyMotivation" className="font-medium">
                          Daily Motivation
                        </Label>
                        <p className="text-xs text-muted-foreground">Receive daily motivational messages</p>
                      </div>
                      <Switch
                        id="dailyMotivation"
                        checked={notificationSettings.dailyMotivation}
                        onCheckedChange={(checked) => handleNotificationSwitchChange("dailyMotivation", checked)}
                        disabled={!notificationSettings.enabled}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Settings</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="soundEffects" className="font-medium">
                          Sound Effects
                        </Label>
                        <p className="text-xs text-muted-foreground">Play sounds for notifications</p>
                      </div>
                      <Switch
                        id="soundEffects"
                        checked={notificationSettings.soundEffects}
                        onCheckedChange={(checked) => handleNotificationSwitchChange("soundEffects", checked)}
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="vibration" className="font-medium">
                          Vibration
                        </Label>
                        <p className="text-xs text-muted-foreground">Vibrate on notifications</p>
                      </div>
                      <Switch
                        id="vibration"
                        checked={notificationSettings.vibration}
                        onCheckedChange={(checked) => handleNotificationSwitchChange("vibration", checked)}
                        disabled={!notificationSettings.enabled}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notificationSound">Notification Sound</Label>
                      <Select
                        value={notificationSettings.notificationSound}
                        onValueChange={(value) =>
                          setNotificationSettings((prev) => ({ ...prev, notificationSound: value }))
                        }
                        disabled={!notificationSettings.enabled || !notificationSettings.soundEffects}
                      >
                        <SelectTrigger id="notificationSound">
                          <SelectValue placeholder="Select sound" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="bell">School Bell</SelectItem>
                          <SelectItem value="chime">Chime</SelectItem>
                          <SelectItem value="alert">Alert</SelectItem>
                          <SelectItem value="gentle">Gentle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notificationTime">Notification Time</Label>
                      <Select
                        value={notificationSettings.notificationTime}
                        onValueChange={(value) =>
                          setNotificationSettings((prev) => ({ ...prev, notificationTime: value }))
                        }
                        disabled={!notificationSettings.enabled}
                      >
                        <SelectTrigger id="notificationTime">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">At the exact time</SelectItem>
                          <SelectItem value="1">1 minute before</SelectItem>
                          <SelectItem value="3">3 minutes before</SelectItem>
                          <SelectItem value="5">5 minutes before</SelectItem>
                          <SelectItem value="10">10 minutes before</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">When to send notifications before events</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quietHours" className="font-medium">
                          Quiet Hours
                        </Label>
                        <Switch
                          id="quietHours"
                          checked={notificationSettings.quietHours}
                          onCheckedChange={(checked) => handleNotificationSwitchChange("quietHours", checked)}
                          disabled={!notificationSettings.enabled}
                        />
                      </div>

                      {notificationSettings.quietHours && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <Label htmlFor="quietHoursStart" className="text-xs">
                              Start Time
                            </Label>
                            <Input
                              id="quietHoursStart"
                              type="time"
                              value={notificationSettings.quietHoursStart}
                              onChange={(e) =>
                                setNotificationSettings((prev) => ({ ...prev, quietHoursStart: e.target.value }))
                              }
                              disabled={!notificationSettings.enabled}
                            />
                          </div>
                          <div>
                            <Label htmlFor="quietHoursEnd" className="text-xs">
                              End Time
                            </Label>
                            <Input
                              id="quietHoursEnd"
                              type="time"
                              value={notificationSettings.quietHoursEnd}
                              onChange={(e) =>
                                setNotificationSettings((prev) => ({ ...prev, quietHoursEnd: e.target.value }))
                              }
                              disabled={!notificationSettings.enabled}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button onClick={handleSubmit} size="lg" className="mt-4">
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Display Options</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="highContrast" className="font-medium">
                        High Contrast
                      </Label>
                      <p className="text-xs text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <Switch
                      id="highContrast"
                      checked={accessibilitySettings.highContrast}
                      onCheckedChange={(checked) => handleAccessibilitySwitchChange("highContrast", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="largeText" className="font-medium">
                        Large Text
                      </Label>
                      <p className="text-xs text-muted-foreground">Increase text size throughout the app</p>
                    </div>
                    <Switch
                      id="largeText"
                      checked={accessibilitySettings.largeText}
                      onCheckedChange={(checked) => handleAccessibilitySwitchChange("largeText", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reduceMotion" className="font-medium">
                        Reduce Motion
                      </Label>
                      <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <Switch
                      id="reduceMotion"
                      checked={accessibilitySettings.reduceMotion}
                      onCheckedChange={(checked) => handleAccessibilitySwitchChange("reduceMotion", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="screenReader" className="font-medium">
                        Screen Reader Support
                      </Label>
                      <p className="text-xs text-muted-foreground">Optimize for screen readers</p>
                    </div>
                    <Switch
                      id="screenReader"
                      checked={accessibilitySettings.screenReader}
                      onCheckedChange={(checked) => handleAccessibilitySwitchChange("screenReader", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="textToSpeech" className="font-medium">
                        Text to Speech
                      </Label>
                      <p className="text-xs text-muted-foreground">Read notifications and alerts aloud</p>
                    </div>
                    <Switch
                      id="textToSpeech"
                      checked={accessibilitySettings.textToSpeech}
                      onCheckedChange={(checked) => handleAccessibilitySwitchChange("textToSpeech", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="colorBlindMode">Color Blind Mode</Label>
                    <Select
                      value={accessibilitySettings.colorBlindMode}
                      onValueChange={(value) =>
                        setAccessibilitySettings((prev) => ({ ...prev, colorBlindMode: value }))
                      }
                    >
                      <SelectTrigger id="colorBlindMode">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="protanopia">Protanopia</SelectItem>
                        <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                        <SelectItem value="tritanopia">Tritanopia</SelectItem>
                        <SelectItem value="achromatopsia">Achromatopsia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Performance Options</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="offlineMode" className="font-medium">
                        Offline Mode
                      </Label>
                      <p className="text-xs text-muted-foreground">Use app without internet connection</p>
                    </div>
                    <Switch
                      id="offlineMode"
                      checked={accessibilitySettings.offlineMode}
                      onCheckedChange={(checked) => handleAccessibilitySwitchChange("offlineMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="lowDataMode" className="font-medium">
                        Low Data Mode
                      </Label>
                      <p className="text-xs text-muted-foreground">Reduce data usage</p>
                    </div>
                    <Switch
                      id="lowDataMode"
                      checked={accessibilitySettings.lowDataMode}
                      onCheckedChange={(checked) => handleAccessibilitySwitchChange("lowDataMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="keyboardShortcuts" className="font-medium">
                        Keyboard Shortcuts
                      </Label>
                      <p className="text-xs text-muted-foreground">Enable keyboard navigation</p>
                    </div>
                    <Switch
                      id="keyboardShortcuts"
                      checked={accessibilitySettings.keyboardShortcuts}
                      onCheckedChange={(checked) => handleAccessibilitySwitchChange("keyboardShortcuts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="focusMode" className="font-medium">
                        Focus Mode
                      </Label>
                      <p className="text-xs text-muted-foreground">Hide non-essential elements</p>
                    </div>
                    <Switch
                      id="focusMode"
                      checked={accessibilitySettings.focusMode}
                      onCheckedChange={(checked) => handleAccessibilitySwitchChange("focusMode", checked)}
                    />
                  </div>
                </div>

                <Button onClick={handleSubmit} size="lg" className="mt-4">
                  Save Changes
                </Button>
              </div>
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

            <TabsContent value="achievements" className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="text-base font-medium">Achievement Settings</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showAchievements" className="font-medium">
                        Show Achievements
                      </Label>
                      <p className="text-xs text-muted-foreground">Display your achievements and badges</p>
                    </div>
                    <Switch
                      id="showAchievements"
                      checked={achievementSettings.showAchievements}
                      onCheckedChange={(checked) => handleAchievementSwitchChange("showAchievements", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="achievementNotifications" className="font-medium">
                        Achievement Notifications
                      </Label>
                      <p className="text-xs text-muted-foreground">Get notified when you earn achievements</p>
                    </div>
                    <Switch
                      id="achievementNotifications"
                      checked={achievementSettings.achievementNotifications}
                      onCheckedChange={(checked) => handleAchievementSwitchChange("achievementNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="publicAchievements" className="font-medium">
                        Public Achievements
                      </Label>
                      <p className="text-xs text-muted-foreground">Make your achievements visible to others</p>
                    </div>
                    <Switch
                      id="publicAchievements"
                      checked={achievementSettings.publicAchievements}
                      onCheckedChange={(checked) => handleAchievementSwitchChange("publicAchievements", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="shareOnSocialMedia" className="font-medium">
                        Share on Social Media
                      </Label>
                      <p className="text-xs text-muted-foreground">Allow sharing achievements on social media</p>
                    </div>
                    <Switch
                      id="shareOnSocialMedia"
                      checked={achievementSettings.shareOnSocialMedia}
                      onCheckedChange={(checked) => handleAchievementSwitchChange("shareOnSocialMedia", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Bookmark className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-base font-medium">Your Achievements</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                      <div className="bg-primary/20 p-2 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">First Timer</h4>
                        <p className="text-xs text-muted-foreground">Used the app for the first time</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                      <div className="bg-primary/20 p-2 rounded-full mr-3">
                        <Flame className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Streak Starter</h4>
                        <p className="text-xs text-muted-foreground">Maintained a 3-day streak</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-muted/30 rounded-lg opacity-50">
                      <div className="bg-primary/20 p-2 rounded-full mr-3">
                        <Award className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Dedicated User</h4>
                        <p className="text-xs text-muted-foreground">Maintained a 7-day streak (Locked)</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-muted/30 rounded-lg opacity-50">
                      <div className="bg-primary/20 p-2 rounded-full mr-3">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Power User</h4>
                        <p className="text-xs text-muted-foreground">Used all app features (Locked)</p>
                      </div>
                    </div>
                  </div>
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

