import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "About Clockdown",
  description: "Learn about the Clockdown app and its creator",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl">About Clockdown</CardTitle>
          <CardDescription>Learn about our app and its purpose</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p>
              Clockdown was created to help students and teachers keep track of school bell schedules with an
              easy-to-use, modern interface. Our goal is to make the school day more manageable by providing real-time
              countdowns to the next period.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Real-time countdowns to the next period</li>
              <li>Support for multiple schools and schedule types</li>
              <li>Customizable themes and preferences</li>
              <li>Weather information</li>
              <li>Mobile and desktop friendly</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Credits</h2>
            <p>
              Clockdown was created by <strong>Nexiloop</strong>. Special thanks to all the contributors who have helped
              make this app possible.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

