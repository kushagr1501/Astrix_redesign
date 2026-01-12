import { useState, useEffect, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Core components (loaded immediately)
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import LoadingScreen from './components/LoadingScreen'

// Lazy loaded components for better performance
const Services = lazy(() => import('./components/Services'))
const Projects = lazy(() => import('./components/Projects'))
const About = lazy(() => import('./components/About'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Simple loading fallback
function SectionLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-400/30 border-t-accent-400 rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Disable loading screen in development for faster iteration
    // Comment this out for production
    // setIsLoading(false)
    // setIsReady(true)
    
    // Preload images and assets
    const preloadAssets = async () => {
      // Simulate asset loading / font loading
      await document.fonts.ready
      
      // Small delay for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    preloadAssets()
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setIsReady(true)
    
    // Enable smooth scroll after loading
    document.documentElement.style.scrollBehavior = 'smooth'
  }

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Cursor Effects */}
      <CursorGlow />
      
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Main Content */}
      <div className={isReady ? 'opacity-100' : 'opacity-0'}>
        <Navigation />

        <main>
          <Hero />
          
          <Marquee />
          
          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          
          <Marquee 
            items={['Web Apps', 'Mobile Apps', 'Blockchain', 'UI/UX', 'E-commerce', 'SaaS']} 
            reverse 
            speed={25}
          />
          
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}
