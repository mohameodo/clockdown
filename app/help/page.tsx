import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Help - Clockdown",
  description: "Get help with using the Clockdown app",
}

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl">Help Center</CardTitle>
          <CardDescription>Find answers to common questions about using Clockdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I set up my school?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  When you first visit Clockdown, you'll be prompted to select your school from our list. If your school
                  isn't listed, you can add a custom school:
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Click on "Add Custom School" in the onboarding modal</li>
                  <li>Enter your school name and select a schedule type</li>
                  <li>Input your school's bell schedule</li>
                  <li>Save your settings</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I change my settings?</AccordionTrigger>
              <AccordionContent>
                <p>
                  You can change your settings at any time by clicking on the gear icon in the top navigation bar. From
                  there, you can update your name, school, and theme preferences.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How does the countdown work?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Clockdown automatically calculates the time remaining until your next class period based on your
                  school's schedule. The countdown updates in real-time, so you always know exactly how much time you
                  have left.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I use Clockdown on my phone?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes! Clockdown is fully responsive and works great on mobile devices. You can even add it to your home
                  screen for quick access.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I add a custom schedule?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">To add a custom schedule:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Go to Settings</li>
                  <li>Click on "Manage Schedules"</li>
                  <li>Select "Add New Schedule"</li>
                  <li>Enter the schedule details and save</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

