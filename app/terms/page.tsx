import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Terms & Privacy - Clockdown",
  description: "Terms of Service and Privacy Policy for Clockdown",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl">Terms & Privacy</CardTitle>
          <CardDescription>Our Terms of Service and Privacy Policy</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="terms">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>
            <TabsContent value="terms" className="space-y-4 mt-4">
              <h2 className="text-xl font-bold">Terms of Service</h2>
              <p>Welcome to Clockdown. By using our service, you agree to these terms. Please read them carefully.</p>
              <h3 className="text-lg font-semibold mt-4">1. Using our Services</h3>
              <p>You must follow any policies made available to you within the Services. Don't misuse our Services.</p>
              <h3 className="text-lg font-semibold mt-4">2. Your Content</h3>
              <p>
                Your content remains yours, which means that you retain any intellectual property rights that you have
                in your content.
              </p>
              <h3 className="text-lg font-semibold mt-4">3. Software in our Services</h3>
              <p>
                Clockdown gives you a personal, worldwide, royalty-free, non-assignable and non-exclusive license to use
                the software provided to you as part of the Services.
              </p>
              <h3 className="text-lg font-semibold mt-4">4. Modifying and Terminating our Services</h3>
              <p>
                We are constantly changing and improving our Services. We may add or remove functionalities or features,
                and we may suspend or stop a Service altogether.
              </p>
            </TabsContent>
            <TabsContent value="privacy" className="space-y-4 mt-4">
              <h2 className="text-xl font-bold">Privacy Policy</h2>
              <p>
                This Privacy Policy describes how we collect, use, and handle your information when you use our
                services.
              </p>
              <h3 className="text-lg font-semibold mt-4">1. Information We Collect</h3>
              <p>We collect information to provide better services to all our users. This includes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Information you provide to us (name, school)</li>
                <li>Information we get from your use of our services (browser information, device information)</li>
                <li>Location information (if you enable the weather widget)</li>
              </ul>
              <h3 className="text-lg font-semibold mt-4">2. How We Use Information</h3>
              <p>
                We use the information we collect to provide, maintain, protect and improve our services, to develop new
                ones, and to protect our users.
              </p>
              <h3 className="text-lg font-semibold mt-4">3. Information Security</h3>
              <p>
                We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure or
                destruction of information we hold.
              </p>
              <h3 className="text-lg font-semibold mt-4">4. Local Storage</h3>
              <p>
                We store your preferences locally on your device using browser local storage. This data never leaves
                your device and is not transmitted to our servers.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

