import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react'
import { useMagnetic, useCountUp } from '../hooks/useAnimations'

const stats = [
  { value: 6, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '+', label: 'Projects Delivered' },
  { value: 10, suffix: '+', label: 'Team Members' }
]

function StatCounter({ value, suffix, label }) {
  const [ref, count] = useCountUp(value, 2.5)

  return (
    <div ref={ref} className="text-center lg:text-left">
      <div className="flex items-baseline justify-center lg:justify-start gap-1">
        <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory">
          {count}
        </span>
        <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-400">
          {suffix}
        </span>
      </div>
      <p className="mt-2 font-body text-sm text-silver">{label}</p>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const ctaRef = useMagnetic(0.15)
  const scrollRef = useMagnetic(0.2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // Status badge
      tl.fromTo(
        '.hero-badge',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.2
      )

      // Main title animation - letter by letter
      tl.fromTo(
        '.hero-title .char',
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.02 },
        0.3
      )

      // Subtitle
      tl.fromTo(
        '.hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.8
      )

      // CTA buttons
      tl.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        1
      )

      // Stats
      tl.fromTo(
        '.hero-stat',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        1.2
      )

      // Floating elements
      tl.fromTo(
        '.hero-float',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' },
        1
      )

      // Scroll indicator
      tl.fromTo(
        '.scroll-indicator',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1.5
      )

      // Continuous floating animation
      gsap.to('.hero-float', {
        y: -15,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: 'random' }
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const titleText = 'Build Products That Scale'
  const titleChars = titleText.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void pt-24"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-40" />

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-500/10 rounded-full blur-[120px]" />

        <div className="absolute inset-0 bg-gradient-radial from-transparent via-void/50 to-void" />
      </div>

      <div className="hero-float absolute top-32 left-[10%] w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-400/20 to-accent-600/20 border border-accent-400/20 backdrop-blur-sm hidden lg:block" />
      <div className="hero-float absolute top-48 right-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-electric-400/20 to-electric-600/20 border border-electric-400/20 backdrop-blur-sm hidden lg:block" />
      <div className="hero-float absolute bottom-32 left-[20%] w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400/10 to-transparent border border-white/10 backdrop-blur-sm hidden lg:block rotate-12" />
      <div className="hero-float absolute bottom-48 right-[25%] w-24 h-24 rounded-3xl bg-gradient-to-br from-electric-400/10 to-transparent border border-white/10 backdrop-blur-sm hidden lg:block -rotate-6" />

      <div className="relative container-wide">
        <div className="max-w-6xl mx-auto text-center">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
      
           
          </div>

          <h1
            ref={titleRef}
            className="hero-title font-display text-hero font-bold text-ivory mb-6"
            style={{ perspective: '1000px' }}
          >
            {titleChars}
          </h1>

          <p className="hero-subtitle max-w-2xl mx-auto font-body text-lg sm:text-xl text-silver mb-10 text-balance">
            From concept to launch, we craft{' '}
            <span className="text-accent-400">high-performing digital products</span>{' '}
            that accelerate growth, increase revenue, and transform your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <div ref={ctaRef} className="hero-cta">
              <a
                href="https://calendly.com/dannydotdev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>
            <a href="#projects" className="hero-cta btn-secondary group">
              <span className="flex items-center gap-2">
                View Our Work
              </span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 lg:gap-12 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <div key={stat.label} className="hero-stat">
                <StatCounter {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2"
      >
      </div>
    </section>
  )
}
