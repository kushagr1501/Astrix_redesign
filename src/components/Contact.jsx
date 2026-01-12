import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ArrowUpRight, 
  Mail, 
  Calendar, 
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { cn } from '../utils/helpers'
import { useInView, useMagnetic } from '../hooks/useAnimations'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [titleRef, titleInView] = useInView({ threshold: 0.3 })
  const ctaRef = useMagnetic(0.15)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: '', email: '', project: '', message: '' })
    }, 3000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-element',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative section-padding bg-void overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-electric-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative container-wide">
        <div className="contact-container max-w-6xl mx-auto">
          <div ref={titleRef} className="text-center mb-16">
            
            <h2 className={cn(
              'font-display text-display font-bold text-ivory mb-6 transition-all duration-700 delay-100',
              titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Ready to Build{' '}
              <span className="text-gradient">Something Great?</span>
            </h2>
            
            <p className={cn(
              'font-body text-xl text-silver max-w-2xl mx-auto transition-all duration-700 delay-200',
              titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Whether you have a detailed spec or just an idea, we'd love to hear about your project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Options */}
            <div className="space-y-8">
              <div className="contact-element">
                <h3 className="font-display text-2xl font-semibold text-ivory mb-6">
                  Get in Touch
                </h3>
                <p className="font-body text-silver mb-8">
                  Choose the option that works best for you. We typically respond within 24 hours.
                </p>
              </div>

              {/* Quick contact options */}
              <div className="space-y-4">
                <a
                  href="https://calendly.com/dannydotdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-element group flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.05] hover:border-accent-500/30 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-void" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-lg font-semibold text-ivory group-hover:text-accent-400 transition-colors">
                      Schedule a Call
                    </h4>
                    <p className="font-body text-sm text-silver">
                      Book a free 30-minute consultation
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-silver group-hover:text-accent-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>

                <a
                  href="mailto:hello@aestrixdevs.digital"
                  className="contact-element group flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.05] hover:border-electric-500/30 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-400 to-electric-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-void" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-lg font-semibold text-ivory group-hover:text-electric-400 transition-colors">
                      Email Us
                    </h4>
                    <p className="font-body text-sm text-silver">
                      hello@aestrixdevs.digital
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-silver group-hover:text-electric-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              </div>

              <div className="contact-element pt-8 border-t border-white/[0.05]">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs text-silver">Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs text-silver">NDA Available</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs text-silver">24h Response</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-element">
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.05]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-void" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ivory">
                    Send a Message
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-sm text-silver mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-ivory placeholder-silver/50 focus:border-accent-500/50 focus:outline-none transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm text-silver mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-ivory placeholder-silver/50 focus:border-accent-500/50 focus:outline-none transition-colors"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm text-silver mb-2">
                      Project Type
                    </label>
                    <select
                      value={formState.project}
                      onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-ivory focus:border-accent-500/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-void">Select a project type</option>
                      <option value="web" className="bg-void">Web Development</option>
                      <option value="mobile" className="bg-void">Mobile App</option>
                      <option value="blockchain" className="bg-void">Blockchain/Web3</option>
                      <option value="design" className="bg-void">UI/UX Design</option>
                      <option value="other" className="bg-void">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-sm text-silver mb-2">
                      Tell Us About Your Project
                    </label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-ivory placeholder-silver/50 focus:border-accent-500/50 focus:outline-none transition-colors resize-none"
                      placeholder="Brief description of your project, goals, and timeline..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={cn(
                      'w-full py-4 rounded-xl font-display font-medium transition-all duration-500 flex items-center justify-center gap-2',
                      isSubmitted
                        ? 'bg-emerald-500 text-void'
                        : 'bg-gradient-to-r from-accent-400 to-accent-500 text-void hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-void/30 border-t-void rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
