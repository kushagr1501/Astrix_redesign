import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const dot = dotRef.current
    
    if (!glow || !dot) return

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 1,
        ease: 'power3.out'
      })
      
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      })
    }

    const handleMouseEnter = () => {
      gsap.to([glow, dot], { opacity: 1, duration: 0.3 })
    }

    const handleMouseLeave = () => {
      gsap.to([glow, dot], { opacity: 0, duration: 0.3 })
    }

    const handleLinkHover = () => {
      gsap.to(glow, { 
        scale: 1.5, 
        duration: 0.4,
        ease: 'power2.out'
      })
      gsap.to(dot, { 
        scale: 2, 
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleLinkLeave = () => {
      gsap.to(glow, { 
        scale: 1, 
        duration: 0.4,
        ease: 'power2.out'
      })
      gsap.to(dot, { 
        scale: 1, 
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover)
      el.addEventListener('mouseleave', handleLinkLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover)
        el.removeEventListener('mouseleave', handleLinkLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[9999] opacity-0 hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[10000] opacity-0 hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0.4) 50%, transparent 100%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  )
}
