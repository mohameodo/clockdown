"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/components/user-provider"
import { Clock, ArrowRight, Bell, Calendar, CloudSun } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export function WelcomePopup() {
  const { user, hasSeenWelcome, setHasSeenWelcome } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show welcome popup if user hasn't seen it yet
    if (!hasSeenWelcome) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [hasSeenWelcome])

  const handleClose = () => {
    setIsOpen(false)
    setHasSeenWelcome(true)
  }

  const features = [
    { icon: <Bell className="h-4 w-4 text-primary" />, text: "Real-time bell countdowns" },
    { icon: <Calendar className="h-4 w-4 text-primary" />, text: "School schedule tracking" },
    { icon: <CloudSun className="h-4 w-4 text-primary" />, text: "Weather updates" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={handleClose}
          />

          {/* Popup card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <Card className="border shadow-lg overflow-hidden glass-effect dark-glass">
              <CardHeader className="bg-primary text-primary-foreground pb-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-6 w-6 mr-2" />
                  <CardTitle className="text-xl">Welcome to Clockdown</CardTitle>
                </div>
                <CardDescription className="text-primary-foreground/90">
                  Your personal school bell countdown assistant
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-2">
                <p className="text-sm mb-4">
                  {user?.name ? `Hi ${user.name}! ` : ""}
                  Clockdown helps you keep track of your school schedule with real-time countdowns and personalized
                  features.
                </p>

                <div className="space-y-3 my-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Badge variant="outline" className="mr-2 p-1">
                        {feature.icon}
                      </Badge>
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end bg-muted/30 pt-2 pb-4">
                <Button onClick={handleClose} className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

