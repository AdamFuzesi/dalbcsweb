"use client"

import { type FC, useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface TimelineEvent {
  year: string
  title: string
  description: string
  impact: string
  tags: string[]
  position: 'above' | 'below'
  x: number
  image: string
}

const events: TimelineEvent[] = [
  {
    year: "2022",
    title: "DAL Blockchain\nFounded",
    description: "Started our journey to revolutionize blockchain education and innovation at the university level, bringing together passionate students.",
    impact: "Building the future of blockchain education",
    tags: ["Education", "Innovation"],
    position: "above",
    x: 1000,
    image: "/Travel Pics/Toronto/IMG_7153.JPG"
  },
  {
    year: "2023",
    title: "First\nHackathon",
    description: "Organized our inaugural blockchain hackathon with over 200 participants from across the region, fostering innovation and collaboration.",
    impact: "200+ participants, countless innovations",
    tags: ["Hackathon", "Community"],
    position: "below",
    x: 2200,
    image: "/Travel Pics/Denver/photo_10_2025-03-18_15-48-03.jpg"
  },
  {
    year: "2023",
    title: "Industry\nPartnership",
    description: "Established partnerships with leading blockchain companies to provide real-world experience and career opportunities for students.",
    impact: "Bridging academia and industry",
    tags: ["Partnership", "Career"],
    position: "above",
    x: 3400,
    image: "/Travel Pics/Michigan/photo_1_2025-07-22_16-24-36.jpg"
  },
  {
    year: "2024",
    title: "Research\nPublication",
    description: "Published groundbreaking research on decentralized systems and their applications in academic and industry contexts.",
    impact: "Contributing to blockchain knowledge",
    tags: ["Research", "Publication"],
    position: "below",
    x: 4600,
    image: "/Travel Pics/Turkiye/IMG_6564 (1).JPG"
  },
  {
    year: "2024",
    title: "Global\nConference",
    description: "Hosted an international blockchain conference bringing together thought leaders, researchers, and innovators from around the world.",
    impact: "Global blockchain community gathering",
    tags: ["Conference", "Global"],
    position: "above",
    x: 5800,
    image: "/Travel Pics/Vienna/crabvienna.jpeg"
  },
  {
    year: "2024",
    title: "SUI\nIntegration",
    description: "Integrated SUI blockchain technology into our curriculum and projects, providing students with cutting-edge experience.",
    impact: "Next-generation blockchain education",
    tags: ["SUI", "Technology"],
    position: "below",
    x: 7000,
    image: "/Travel Pics/Toronto/photo_2025-05-19_11-49-01.jpg"
  }
]

export const TimelineSection: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  
  // Calculate maxScroll based on the last event position
  const lastEventX = Math.max(...events.map(event => event.x))
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200

  // using framer-motion scroll tracking for the entire timeline section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // scroll progress to timeline position
  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, lastEventX + 400])

  // draws the wave on the canvas timeline
  const drawWave = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#FFC700' // Using your brand yellow
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    ctx.beginPath()
    
    const amplitude = 200
    const frequency = 0.0008
    const centerY = 300
    
    for (let x = 0; x <= canvas.width; x += 2) {
      const y = centerY + Math.sin(x * frequency) * amplitude
      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    
    ctx.stroke()
  }

  // Get wave Y position at X coordinate
  const getWaveY = (x: number) => {
    const amplitude = 200
    const frequency = 0.0008
    const centerY = 300
    return centerY + Math.sin(x * frequency) * amplitude
  }

  useEffect(() => {
    drawWave()
  }, [])

  // Redraw wave when component mounts to ensure alignment
  useEffect(() => {
    const timer = setTimeout(() => {
      drawWave()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Update events based on scroll progress
  useEffect(() => {
    const unsubscribe = timelineProgress.on("change", (latest) => {
      // Check for event triggers based on timeline position
      events.forEach((event, index) => {
        if (index <= currentEventIndex) return
        
        if (latest >= event.x - 300) {
          setCurrentEventIndex(index)
        }
      })
    })

    return unsubscribe
  }, [currentEventIndex, timelineProgress])

  return (
    <section ref={sectionRef} className="relative h-[600vh] bg-black">
      {/* Timeline Title - Only visible in this section */}
      <div className="sticky top-0 h-0 z-50 pointer-events-none">
        <motion.div 
          className="absolute top-8 left-10"
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.05, 1], [1, 0, 0])
          }}
        >
          <h2 className="text-7xl md:text-8xl font-bold tracking-tight">
            <span className="text-white">Our</span><br />
            <span className="text-yellow-400">Journey</span>
          </h2>
        </motion.div>
      </div>



      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Timeline Container */}
        <motion.div 
          ref={containerRef}
          className="relative w-[8000px] h-full origin-left"
          style={{ 
            x: useTransform(timelineProgress, (latest) => {
              const dotX = latest
              return -(Math.max(0, Math.min(dotX - viewportWidth / 2, lastEventX - viewportWidth + 800)))
            })
          }}
        >
        <div className="absolute top-[60%] left-0 w-[8000px] h-[600px] -translate-y-1/2">
          {/* Canvas Wave */}
          <canvas 
            ref={canvasRef}
            width={8000}
            height={600}
            className="absolute top-0 left-0"
          />
          
          {/* Traveling Dot */}
          <motion.div 
            className="absolute w-6 h-6 bg-yellow-400 rounded-full z-50"
            style={{ 
              x: useTransform(timelineProgress, (latest) => latest - 12),
              y: useTransform(timelineProgress, (latest) => getWaveY(latest) - 12)
            }}
          />
          
          {/* Event Points and Displays */}
          {events.map((event, index) => (
            <div key={index}>
              {/* Event Point */}
              <div 
                className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full z-40 opacity-100"
                style={{ left: `${event.x}px`, top: `${getWaveY(event.x) - 3}px` }}
              />
              
              {/* Event Display - Dynamic positioning based on wave */}
              <div 
                className={`absolute w-[500px] transition-all duration-200 ease-out z-30 ${
                  getWaveY(event.x) < 300 ? 'top-96' : 'bottom-96'
                } ${
                  index <= currentEventIndex ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{ 
                  left: `${event.x - 250}px`,
                  transitionDelay: index <= currentEventIndex ? `${(index - currentEventIndex + events.length) * 20}ms` : '0ms'
                }}
              >
                <div className="text-yellow-400 text-base font-semibold mb-3 tracking-wider uppercase">
                  {event.year}
                </div>
                <div className="text-white text-5xl font-bold mb-5 tracking-tight leading-tight whitespace-pre-line">
                  {event.title}
                </div>
                <div className="text-gray-400 text-lg leading-relaxed mb-6 max-w-[450px]">
                  {event.description}
                </div>
                <div className="text-gray-500 text-base italic mb-5">
                  {event.impact}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {event.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-transparent text-yellow-400 border border-yellow-400 px-4 py-1.5 text-xs font-medium tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image - Positioned separately to not interfere with text layout */}
              <motion.div 
                className={`absolute w-[420px] h-[260px] rounded-lg overflow-hidden shadow-xl border transition-all duration-500 ease-out ${
                  getWaveY(event.x) < 300 ? 'top-[320px]' : 'bottom-[400px]'
                } ${
                  index <= currentEventIndex ? 'opacity-80 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'
                }`}
                style={{
                  left: `${event.x + 200}px`,
                  transitionDelay: index <= currentEventIndex ? `${(index - currentEventIndex + events.length) * 50 + 150}ms` : '0ms'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br to-transparent z-10" />
                <Image
                  src={event.image}
                  alt={`${event.title} - ${event.year}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            </div>
          ))}
        </div>
        </motion.div>
      </div>
    </section>
  )
}