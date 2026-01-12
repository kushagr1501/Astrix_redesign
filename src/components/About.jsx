import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, Lightbulb, Target, TrendingUp, Award } from 'lucide-react'
import { cn } from '../utils/helpers'
import { useInView } from '../hooks/useAnimations'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Skilled professionals with deep expertise across web, mobile, blockchain, and design.',
    gradient: 'from-accent-400 to-accent-600'
  },
  {
    icon: Lightbulb,
    title: 'Innovative Solutions',
    description: 'Cutting-edge technologies and creative approaches to solve complex challenges.',
    gradient: 'from-electric-400 to-electric-600'
  },
  {
    icon: Target,
    title: 'Customer Focused',
    description: 'Your success is our priority. We work closely with you every step of the way.',
    gradient: 'from-emerald-400 to-emerald-600'
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    description: '30+ projects completed with measurable growth and ROI for our clients.',
    gradient: 'from-rose-400 to-rose-600'
  }
]

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'Deep dive into your goals and requirements' },
  { num: '02', title: 'Strategy', desc: 'Craft a roadmap aligned with objectives' },
  { num: '03', title: 'Design', desc: 'Create intuitive interfaces that convert' },
  { num: '04', title: 'Develop', desc: 'Build with clean, scalable code' },
  { num: '05', title: 'Launch', desc: 'Deploy and optimize for performance' },
  { num: '06', title: 'Support', desc: 'Ongoing maintenance and growth' }
]

function FeatureCard({ feature, index }) {
  const isEven = index % 2 === 0

  return (
    <div className="feature-card group relative h-full">
      <div className="absolute -inset-4 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

      <div className="relative h-full p-8 rounded-3xl bg-void border border-white/[0.08] group-hover:border-white/[0.15] transition-all duration-700 overflow-hidden">
        <div className={cn(
          'absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-700',
          feature.gradient
        )} />

        <div className="absolute top-6 right-6 font-mono text-[4rem] font-bold text-white/[0.03] leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="relative z-10 flex flex-col h-full">

          <div className="mb-auto">
            <div className={cn(
              'inline-flex w-12 h-12 rounded-xl items-center justify-center mb-6 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110',
              feature.gradient,
              isEven ? 'rotate-[-4deg] group-hover:rotate-0' : 'rotate-[4deg] group-hover:rotate-0'
            )}>
              <feature.icon className="w-6 h-6 text-void" strokeWidth={2.5} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-ivory mb-3 group-hover:text-white transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="font-body text-silver/90 leading-relaxed text-[15px]">
              {feature.description}
            </p>
          </div>
        </div>

        <div className={cn(
          'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left',
          feature.gradient
        )} />
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const [titleRef, titleInView] = useInView({ threshold: 0.3 })
  const [processRef, processInView] = useInView({ threshold: 0.2 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.features-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
      })
      gsap.fromTo('.process-step', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.process-container', start: 'top 80%', toggleActions: 'play none none reverse' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative section-padding bg-void overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-accent-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative container-wide">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">

          <h2 className={cn(
            'font-display text-display font-bold text-ivory mb-6 transition-all duration-700 delay-100',
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Built on Trust, <span className="text-gradient">Driven by Results</span>
          </h2>
          <p className={cn(
            'font-body text-xl text-silver transition-all duration-700 delay-200',
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            We're not just developers—we're partners invested in your success.
          </p>
        </div>

        <div className="features-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <div ref={processRef} className="process-container">
          <div className="text-center mb-16">
            <h3 className={cn(
              'font-display text-heading font-bold text-ivory mb-4 transition-all duration-700',
              processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>Our Process</h3>
            <p className={cn(
              'font-body text-lg text-silver transition-all duration-700 delay-100',
              processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>A proven methodology that delivers results</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.num} className="process-step text-center group">
                <div className="relative mb-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.1] flex items-center justify-center group-hover:border-accent-500/50 transition-colors duration-500">
                    <span className="font-display text-2xl font-bold text-accent-400">{step.num}</span>
                  </div>
                </div>
                <h4 className="font-display text-lg font-semibold text-ivory mb-2">{step.title}</h4>
                <p className="font-body text-sm text-silver">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
