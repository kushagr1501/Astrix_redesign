import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Smartphone, Boxes, Palette, ArrowUpRight } from 'lucide-react'
import { cn } from '../utils/helpers'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'web',
    icon: Globe,
    title: 'Web Engineering',
    description: 'Scalable architectures built for performance. We engineer platforms, not just websites.',
    colSpan: 'md:col-span-2',
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20'
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Native Mobile',
    description: 'Fluid, gesture-driven experiences for iOS and Android ecosystems.',
    colSpan: 'md:col-span-1',
    gradient: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20'
  },
  {
    id: 'blockchain',
    icon: Boxes,
    title: 'Web3 / DeFi',
    description: 'Smart contracts and decentralized infrastructure with audit-ready security.',
    colSpan: 'md:col-span-1',
    gradient: 'from-emerald-500/20 via-green-500/20 to-lime-500/20'
  },
  {
    id: 'design',
    icon: Palette,
    title: 'Product Design',
    description: 'Systematic UI/UX that bridges the gap between brand identity and user intent.',
    colSpan: 'md:col-span-2',
    gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20'
  }
]

export default function Services() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!gridRef.current) return
    const rect = gridRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  useEffect(() => {
    ScrollTrigger.refresh()

    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        rotateX: 10,
        duration: 1,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative pt-32 lg:pt-40 pb-12 lg:pb-20 bg-[#0c0c0e] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none mix-blend-overlay" />

      <div className="relative container mx-auto px-6 max-w-[1600px]">
        <div className="mb-10 lg:mb-12 max-w-3xl mx-auto text-center">


          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.95]">
            We Build{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Digital Engines
              </span>
            </span>
          </h2>

          <p className="font-body text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
            Full-stack solutions engineered for scale, performance, and lasting impact.
          </p>
        </div>

        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="group grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
            }}
          />

          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                "service-card relative h-[320px] rounded-[2rem] bg-zinc-900/50 border border-white/5 overflow-hidden group/card hover:border-white/10 transition-colors",
                service.colSpan
              )}
            >
              <div className={cn(
                "absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-gradient-to-br",
                service.gradient
              )} />

              <div className="relative h-full p-8 lg:p-10 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/card:scale-110 transition-transform duration-500">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-zinc-600 group-hover/card:text-white group-hover/card:rotate-45 transition-all duration-300" />
                </div>

                <div className="text-left">
                  <h3 className="font-display text-3xl font-medium text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="font-body text-zinc-400 leading-relaxed max-w-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}