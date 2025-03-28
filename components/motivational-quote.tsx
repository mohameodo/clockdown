"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, RefreshCw } from "lucide-react"

const quotes = [
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
  },
  {
    text: "Education is not preparation for life; education is life itself.",
    author: "John Dewey",
  },
  {
    text: "The mind is not a vessel to be filled, but a fire to be kindled.",
    author: "Plutarch",
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Your attitude, not your aptitude, will determine your altitude.",
    author: "Zig Ziglar",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Don't let what you cannot do interfere with what you can do.",
    author: "John Wooden",
  },
]

export function MotivationalQuote() {
  const [quote, setQuote] = useState(quotes[0])
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    // Set a random quote on initial load
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }, [])

  const getNewQuote = () => {
    setFadeIn(false)

    setTimeout(() => {
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * quotes.length)
      } while (quotes[randomIndex].text === quote.text)

      setQuote(quotes[randomIndex])
      setFadeIn(true)
    }, 300)
  }

  return (
    <Card className="card-quote transparent-card">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start mb-3">
          <Quote className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
          <div className={`transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
            <p className="text-sm sm:text-base font-medium italic mb-1">{quote.text}</p>
            <p className="text-xs text-muted-foreground text-right">— {quote.author}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={getNewQuote} className="text-xs h-7 px-2">
            <RefreshCw className="h-3 w-3 mr-1" />
            New Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

