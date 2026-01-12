import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote, Star, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { cn } from '../utils/helpers'
import { useInView, useCountUp } from '../hooks/useAnimations'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    content: "Exceptional mobile app development customized for our platform, enabling users to create, share, and publish forms. The team's attention to detail and commitment to quality exceeded our expectations.",
    author: 'Tamara',
    role: 'CEO',
    company: 'Yefa Daily',
    location: 'Lagos, Nigeria',
    avatar: 'T',
    rating: 5,
    color: '#F59E0B',
    image: null
  },
  {
    id: 2,
    content: "The healthcare website they built has been a game changer for our company's outreach and patient engagement. Professional, responsive, and truly understood our needs in the healthcare space.",
    author: 'Yasmin',
    role: 'CFO',
    company: 'Careposting',
    location: 'Singapore',
    avatar: 'Y',
    rating: 5,
    color: '#8B5CF6',
    image: null
  },
  {
    id: 3,
    content: "Their expertise with whitelist management, airdrops, and token launch helped us execute and scale flawlessly. The blockchain knowledge they brought to the table was invaluable for our success.",
    author: 'Donald James',
    role: 'CTO',
    company: 'Lumanagi',
    location: 'Hungary',
    avatar: 'D',
    rating: 5,
    color: '#10B981',
    image: null
  }
]

const stats = [
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 4.9, suffix: '★', label: 'Average Rating', decimals: 1 },
  { value: 90, suffix: '%', label: 'Repeat Clients' }
]

function StatItem({ stat, index }) {
  const [ref, count] = useCountUp(stat.value, 2.5)

  return (
    <div ref={ref} className="relative text-center group">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

      <div className="relative">
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
            {stat.decimals ? count.toFixed(stat.decimals) : count}
          </span>
          <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            {stat.suffix}
          </span>
        </div>
        <p className="font-body text-sm text-white/40 tracking-wide">{stat.label}</p>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial, isActive, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      gsap.to(card.querySelector('.card-glow'), {
        x: `${x * 100}%`,
        y: `${y * 100}%`,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn(
        'testimonial-card group relative h-full transition-all duration-700',
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
      )}
    >
      <div className="relative h-full p-8 lg:p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:shadow-2xl hover:shadow-black/20">

        <div
          className="card-glow absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${testimonial.color}15 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)'
          }}
        />

        <div
          className="absolute -top-5 -left-2 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6"
          style={{
            background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}cc)`,
            boxShadow: `0 15px 40px ${testimonial.color}40`
          }}
        >
          <Quote className="w-6 h-6 text-black" fill="black" />
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-1.5 mb-6 mt-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 transition-all duration-300"
                style={{
                  fill: testimonial.color,
                  color: testimonial.color,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
            <span className="ml-2 font-mono text-xs text-white/30">{testimonial.rating}.0</span>
          </div>

          <blockquote className="flex-1">
            <p className="font-body text-lg lg:text-xl text-white/80 leading-relaxed">
              "{testimonial.content}"
            </p>
          </blockquote>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/[0.06]">
            <div
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center font-display text-xl font-bold shadow-lg transition-all duration-500 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${testimonial.color}40, ${testimonial.color}20)`,
                border: `2px solid ${testimonial.color}50`
              }}
            >
              <span style={{ color: testimonial.color }}>{testimonial.avatar}</span>
            </div>

            <div className="flex-1">
              <h4 className="font-display text-lg font-semibold text-white mb-0.5">
                {testimonial.author}
              </h4>
              <p className="font-body text-sm text-white/50">
                {testimonial.role}, {testimonial.company}
              </p>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-wider mt-1">
                {testimonial.location}
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 right-0 w-32 h-32 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
          style={{
            background: `radial-gradient(circle at bottom right, ${testimonial.color}, transparent 70%)`
          }}
        />

        <div className="absolute inset-0 rounded-[2rem] p-px pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute inset-0 rounded-[2rem]"
            style={{
              background: `conic-gradient(from 180deg at 50% 50%, transparent, ${testimonial.color}30, transparent)`,
              animation: 'spin 4s linear infinite'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [titleRef, titleInView] = useInView({ threshold: 0.3 })

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    ScrollTrigger.refresh()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-card',
        {
          y: 50,
          opacity: 0,
          rotateX: -10
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.testimonials-container',
        
            start: 'top bottom', 
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.fromTo(
        '.stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top bottom',
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.to('.testimonials-bg-orb', {
        y: -150, 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5 
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={sectionRef} id="testimonials" className="relative pt-32 lg:pt-40 pb-10 lg:pb-6 bg-[#0a0a0c] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="testimonials-bg-orb absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-500/[0.05] rounded-full blur-[200px]" />
        <div className="testimonials-bg-orb absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.05] rounded-full blur-[180px]" />

        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0c0c0e] to-transparent" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <h2 className={cn(
            'font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.95] transition-all duration-700 delay-100',
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            What Our{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Clients Say
              </span>
            </span>
          </h2>

          <p className={cn(
            'font-body text-lg text-white/40 transition-all duration-700 delay-200',
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Real feedback from clients who've experienced the Aestrix difference.
          </p>
        </div>

        <div className="testimonials-container hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={true}
              index={index}
            />
          ))}
        </div>

        <div className="testimonials-container md:hidden mb-16">
          <TestimonialCard
            testimonial={testimonials[activeIndex]}
            isActive={true}
            index={activeIndex}
          />

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-all active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-500',
                    i === activeIndex
                      ? 'w-8 bg-gradient-to-r from-amber-400 to-orange-500'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-all active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="stats-container relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="pt-16 grid grid-cols-3 gap-8 lg:gap-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat-item">
                <StatItem stat={stat} index={index} />
              </div>
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        </div>

        <div className="mt-20 text-center">
          <p className="font-body text-white/30 mb-6 text-sm">
            Join 30+ satisfied clients who trusted us with their vision
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-display font-semibold transition-all duration-500 hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Success Story
            <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
              <Play className="w-3 h-3 text-black fill-black ml-0.5" />
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}