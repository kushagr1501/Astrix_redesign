import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '../utils/helpers'
import { useMagnetic, useScrollDirection } from '../hooks/useAnimations'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const scrollDirection = useScrollDirection()
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const ctaRef = useMagnetic(0.2)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      // Animate Circle Expanding
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at calc(100% - 40px) 40px)',
        duration: 0.8,
        ease: 'expo.inOut'
      })

      // Animate Links In
      gsap.fromTo(
        '.mobile-nav-link',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'expo.out' }
      )
    } else {
      document.body.style.overflow = ''

      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at calc(100% - 40px) 40px)',
        duration: 0.8,
        ease: 'expo.inOut'
      })
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-5',
          scrollDirection === 'down' && scrolled ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="container-wide">
          <div
            className={cn(
              'relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500',
              scrolled ? 'glass' : 'bg-transparent'
            )}
          >
            <a href="#hero" className="relative z-10 flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center overflow-hidden">
                <span className="font-display font-bold text-void text-lg">A</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </div>
              <span className="font-display font-semibold text-xl text-ivory hidden sm:block">
                Aestrix
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-5 py-2 font-body text-sm text-silver hover:text-ivory transition-colors duration-300 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 rounded-full bg-white/[0.05] scale-0 group-hover:scale-100 transition-transform duration-300" />
                </a>
              ))}
            </div>

            <div className="hidden lg:block" ref={ctaRef}>
              <a
                href="https://calendly.com/dannydotdev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group text-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Let's Talk
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] text-ivory hover:bg-white/[0.1] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={menuRef}
        className={cn(
          'fixed inset-0 z-40 bg-void lg:hidden',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        style={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative h-full flex flex-col items-center justify-center gap-6 p-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="mobile-nav-link font-display text-4xl sm:text-5xl text-ivory hover:text-accent-400 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://calendly.com/dannydotdev"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="mobile-nav-link mt-8 btn-primary"
          >
            <span className="flex items-center gap-2">
              Let's Talk
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </a>
        </div>
      </div>
    </>
  )
}