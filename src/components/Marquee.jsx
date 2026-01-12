import { cn } from '../utils/helpers'

const defaultItems = ['Innovate', 'Create', 'Inspire', 'Build', 'Scale', 'Transform']

export default function Marquee({ 
  items = defaultItems, 
  speed = 30, 
  reverse = false,
  className = '',
  separator = '◇'
}) {
  const marqueeItems = [...items, ...items] // Duplicate for seamless loop

  return (
    <div className={cn('relative overflow-hidden py-6 bg-obsidian border-y border-white/[0.05]', className)}>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-obsidian to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-obsidian to-transparent z-10" />
      
      <div
        className={cn(
          'flex items-center gap-8 whitespace-nowrap',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {marqueeItems.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl sm:text-3xl font-medium text-ivory/80 hover:text-accent-400 transition-colors cursor-default">
              {item}
            </span>
            <span className="text-accent-400 text-lg">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
