import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ExternalLink, MoveRight } from 'lucide-react'
import { cn } from '../utils/helpers'
import { useInView } from '../hooks/useAnimations'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'yefa',
    title: 'Yefa Daily',
    category: 'Mobile App',
    description: 'A productivity app designed for men to build consistency, track habits, and achieve daily goals with gamification.',
    image: '/images/yefa.png',
    link: 'https://yefadaily.com',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Push Notifications'],
    color: '#F59E0B',
    stats: { users: '10K+', rating: '4.8★' },
    year: '2024'
  },
  {
    id: 'careposting',
    title: 'Careposting',
    category: 'Healthcare Platform',
    description: 'Merging electronic medical records with marketing tools for healthcare providers.',
    image: '/images/careposting.svg',
    link: 'https://careposting.com/',
    technologies: ['Next.js', 'PostgreSQL', 'AWS', 'HIPAA'],
    color: '#8B5CF6',
    stats: { providers: '500+', efficiency: '+40%' },
    year: '2024'
  },
  {
    id: 'subsync',
    title: 'Subsync',
    category: 'Newsletter Platform',
    description: 'Curates exclusive deals and product drops from favorite brands into one stylish newsletter hub.',
    image: '/images/newsletter.svg',
    link: 'https://subsync-newsletter.vercel.app/',
    technologies: ['Next.js', 'Tailwind', 'Resend', 'Vercel'],
    color: '#10B981',
    stats: { subscribers: '25K+', openRate: '45%' },
    year: '2023'
  },
  {
    id: 'heritage',
    title: 'Heritage',
    category: 'Insurance Platform',
    description: 'Comprehensive insurance platform simplifying policy management and claims processing.',
    image: '/images/heritage.png',
    link: 'https://heritage-phi.vercel.app/',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    color: '#EC4899',
    stats: { policies: '5K+', claimTime: '-60%' },
    year: '2023'
  },
  {
    id: 'freshwash',
    title: 'Fresh Wash',
    category: 'Service Platform',
    description: 'Laundry and dry-cleaning service platform with booking, tracking, and delivery.',
    image: '/images/laundry.png',
    link: 'https://fresh-wash.pages.dev/',
    technologies: ['React', 'Express', 'Stripe', 'Cloudflare'],
    color: '#06B6D4',
    stats: { orders: '15K+', satisfaction: '98%' },
    year: '2023'
  },
  {
    id: 'texxtile',
    title: 'Texxtile',
    category: 'Creator Platform',
    description: 'Launch custom merch lines with built-in analytics and direct-to-customer sales.',
    image: '/images/textile.svg',
    link: 'https://my-texttile-two.vercel.app/',
    technologies: ['Next.js', 'Prisma', 'Printful API', 'Stripe'],
    color: '#F43F5E',
    stats: { creators: '1K+', revenue: '$2M+' },
    year: '2024'
  }
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(imageRef.current, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.5,
        ease: 'power2.out'
      })

      gsap.to(card.querySelector('.card-spotlight'), {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="project-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.08] transition-all duration-700 hover:border-white/[0.15] hover:shadow-2xl hover:shadow-black/20">

        <div
          className="card-spotlight absolute w-[400px] h-[400px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: `radial-gradient(circle, ${project.color}20 0%, transparent 60%)`,
            transform: 'translate(-50%, -50%)'
          }}
        />

        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: `linear-gradient(135deg, ${project.color}25 0%, transparent 50%, ${project.color}10 100%)`
              }}
            />
            <div
              className="absolute top-0 right-0 w-3/4 h-3/4 rounded-full blur-[100px] transition-all duration-700 group-hover:scale-150 group-hover:opacity-60"
              style={{ background: project.color, opacity: 0.15 }}
            />
            <div
              className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[80px] transition-all duration-700 group-hover:scale-125"
              style={{ background: project.color, opacity: 0.1 }}
            />
          </div>

          <div
            ref={imageRef}
            className="relative h-full flex items-center justify-center p-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-full max-w-[260px] transition-all duration-700 group-hover:scale-[1.08]">
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-[100%] blur-xl transition-all duration-700 group-hover:scale-110 group-hover:-bottom-6"
                style={{ background: project.color, opacity: 0.3 }}
              />

              <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.04] border border-white/[0.15] p-3 backdrop-blur-sm shadow-2xl">
                <div
                  className="aspect-[4/3] rounded-xl flex items-center justify-center overflow-hidden relative"
                  style={{ background: `linear-gradient(145deg, ${project.color}15, ${project.color}05)` }}
                >
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />

                  <div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-display font-bold shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)`,
                      color: '#000',
                      boxShadow: `0 20px 50px ${project.color}50`
                    }}
                  >
                    {project.title[0]}

                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-white/10" />
              </div>

              <div
                className="absolute -top-3 -right-3 w-12 h-12 rounded-xl flex items-center justify-center text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                  color: '#000'
                }}
              >
                {project.year}
              </div>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-xl whitespace-nowrap">
                {Object.entries(project.stats).map(([key, value], i) => (
                  <span key={key} className="flex items-center gap-2">
                    <span className="text-white font-display font-semibold text-sm">{value}</span>
                    {i === 0 && <span className="w-px h-3 bg-white/20" />}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-500">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-sm opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 delay-100 hover:scale-105"
              style={{
                background: project.color,
                color: '#000',
                boxShadow: `0 15px 40px ${project.color}60`
              }}
            >
              View Project
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="p-6 pt-5 text-left">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: project.color, boxShadow: `0 0 10px ${project.color}` }}
              />
              <span
                className="font-mono text-[11px] uppercase tracking-widest font-medium"
                style={{ color: project.color }}
              >
                {project.category}
              </span>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.1] transition-all duration-300 group-hover:rotate-45"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <h3 className="font-display text-[1.65rem] font-bold text-white mb-2 group-hover:text-white transition-colors leading-tight">
            {project.title}
          </h3>

          <p className="font-body text-sm text-white/50 mb-5 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] text-white/40 uppercase tracking-wider transition-all duration-300 hover:bg-white/[0.08] hover:text-white/60 hover:border-white/[0.12]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1.5 font-mono text-[10px] text-white/30">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div
            className="h-full w-full -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const [titleRef, titleInView] = useInView({ threshold: 0.3 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: { each: 0.12, from: 'start' },
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      )

      gsap.to('.projects-bg-orb', {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 lg:py-40 bg-[#0c0c0e] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:70px_70px]" />
        <div className="projects-bg-orb absolute top-1/4 -left-40 w-[600px] h-[600px] bg-violet-500/[0.07] rounded-full blur-[180px]" />
        <div className="projects-bg-orb absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-amber-500/[0.07] rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">

          <h2 className={cn(
            'font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.95] transition-all duration-700 delay-100',
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Projects That{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Define Success
              </span>
            </span>
          </h2>

          <p className={cn(
            'font-body text-lg text-white/40 max-w-xl mx-auto mb-10 transition-all duration-700 delay-200',
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Real solutions delivering measurable results for clients across industries.
          </p>

          <div className={cn(
            'flex justify-center transition-all duration-700 delay-300',
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white font-display font-medium transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-lg hover:shadow-amber-500/5"
            >
              Start Your Project
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-amber-500/30">
                <MoveRight className="w-4 h-4 text-black" />
              </div>
            </a>
          </div>
        </div>

        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="font-body text-white/30 mb-4 text-sm">
            Want to see more of our work?
          </p>
          <button className="font-mono text-sm text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-2 group">
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}