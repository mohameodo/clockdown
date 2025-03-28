import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "@/components/user-provider"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NotificationHandler } from "@/components/notification-handler"
import { OfflineIndicator } from "@/components/offline-indicator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  title: "Clockdown - School Bell Countdown",
  description: "Track your school bell schedule with real-time countdowns",
  openGraph: {
    title: "Clockdown - School Bell Countdown",
    description: "Track your school bell schedule with real-time countdowns",
    type: "website",
    locale: "en_US",
  },
    generator: 'nexiloop'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-blocking tags for school networks */}
        <meta name="resource-type" content="document" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="classification" content="education" />
        <meta name="subject" content="education, school tools" />
        <meta name="owner" content="educational institution" />
        <meta name="category" content="education" />
        <meta name="educational-resource" content="true" />
        <meta name="academic-tool" content="true" />
        <meta name="learning-management" content="true" />
        <meta name="student-resource" content="true" />
        <meta name="teacher-resource" content="true" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserProvider>
            <ThemeCustomizer />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <NotificationHandler />
            <OfflineIndicator />
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'