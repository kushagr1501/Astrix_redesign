import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { cn } from '../utils/helpers'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 0.8,
          ease: 'expo.inOut',
          onComplete
        })
      }
    })

    // Logo entrance
    tl.fromTo(
      logoRef.current,
      { scale: 0, rotate: -180 },
      { scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' }
    )

    // Progress animation
    tl.to({}, {
      duration: 1.5,
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100))
      }
    })

    // Slight pause before exit
    tl.to({}, { duration: 0.3 })

  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center"
      style={{ clipPath: 'circle(150% at 50% 50%)' }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-500/20 rounded-full blur-[100px]" />

      <div
        ref={logoRef}
        className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mb-8"
      >
        <span className="font-display font-bold text-void text-5xl">A</span>
        
        <div className="absolute -inset-2 border-2 border-accent-400/30 rounded-[2rem] animate-spin-slow" 
          style={{ 
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent'
          }} 
        />
      </div>

      <div ref={progressRef} className="text-center">
        <div className="font-display text-6xl font-bold text-ivory mb-2">
          {progress}%
        </div>
        <p className="font-mono text-sm text-silver tracking-widest uppercase">
          Loading Experience
        </p>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-accent-400 to-accent-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
