"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useUser } from "@/components/user-provider"
import { Clock, Home, HelpCircle, Info, Settings, User, Calendar, Bell, Flame, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DialogTitle } from "@/components/ui/dialog"

export function Header() {
  const pathname = usePathname()
  const { user, streakCount } = useUser()
  const [scrolled, setScrolled] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "About", href: "/about", icon: Info },
    { name: "Help", href: "/help", icon: HelpCircle },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check for notifications (mock implementation)
  useEffect(() => {
    // This would normally check for actual notifications
    // For demo purposes, we'll randomly set notifications
    const checkNotifications = () => {
      if (user?.notificationSettings?.enabled) {
        // Random chance of having notifications for demo
        setHasNotifications(Math.random() > 0.7)
      } else {
        setHasNotifications(false)
      }
    }

    checkNotifications()
    const interval = setInterval(checkNotifications, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [user?.notificationSettings?.enabled])

  return (
    <>
      {/* Mobile Top Header */}
      <header className="sm:hidden sticky top-0 z-50 bg-background border-b">
        <div className="flex h-12 items-center justify-between px-2">
          <div className="flex items-center space-x-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] pt-10">
                <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-2 px-2 py-2 rounded-md ${
                        pathname === item.href ? "bg-primary/10 text-primary" : "text-foreground"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-1">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">Clockdown</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            {streakCount > 0 && (
              <div className="streak-counter">
                <Flame className="streak-flame h-4 w-4" />
                <span>{streakCount}</span>
              </div>
            )}
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Desktop/Tablet Header */}
      <header
        className="sticky top-0 z-50 w-full hidden sm:block bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300"
        style={{ borderBottom: scrolled ? "1px solid hsl(var(--border))" : "none" }}
      >
        <div className="container flex h-12 items-center">
          <div className="mr-2  flex">
            <Link href="/" className="flex items-center space-x-1">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">Clockdown</span>
            </Link>
          </div>

          <nav className="flex-1 centered-nav">
            <div className="flex items-center justify-center space-x-1 max-w-[400px] mx-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-tab px-2.5 py-1.5 text-sm ${pathname === item.href ? "nav-tab-active" : ""}`}
                >
                  <div className="flex items-center space-x-1">
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline-block">{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          <div className="ml-auto flex items-center space-x-0.5 sm:space-x-1">
            {/* Streak Counter */}
            {streakCount > 0 && (
              <div className="streak-counter">
                <Flame className="streak-flame h-4 w-4" />
                <span>{streakCount}</span>
              </div>
            )}

            {user?.notificationSettings?.enabled && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
                <Bell className="h-3.5 w-3.5" />
                {hasNotifications && <span className="notification-badge"></span>}
              </Button>
            )}
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs">{user?.name || "Student"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="text-xs">
                  <Link href="/settings">
                    <Settings className="mr-2 h-3.5 w-3.5" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}

