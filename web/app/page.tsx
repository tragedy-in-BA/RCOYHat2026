import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Benefits from '@/components/Benefits'
import Simulator from '@/components/Simulator'
import EvaluationForm from '@/components/EvaluationForm'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Nav />
      <Hero />
      <Stats />
      <HowItWorks />
      <Benefits />
      <Simulator />
      <EvaluationForm />
      <Footer />
    </>
  )
}
