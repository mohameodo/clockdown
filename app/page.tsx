import { CountdownPage } from "@/components/countdown-page"
import { OnboardingModal } from "@/components/onboarding-modal"
import { WelcomePopup } from "@/components/welcome-popup"

export default function Home() {
  return (
    <>
      <CountdownPage />
      <OnboardingModal />
      <WelcomePopup />
    </>
  )
}

