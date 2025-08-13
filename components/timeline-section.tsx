"use client"

import { type FC, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import content from "@/content/site-content.json"

interface Event {
  title: string
  description: string
  image?: string
}

const events: Event[] = content.timeline.events as Event[]
type ActiveEvent = { event: Event; position: "left" | "right" }

export const TimelineSection: FC = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-83%"])
  const [activeEvent, setActiveEvent] = useState<ActiveEvent | null>(null)
  const closeTimer = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (event: Event, element: HTMLElement) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
    }
    const rect = element.getBoundingClientRect()
    const position = rect.left < window.innerWidth / 2 ? "left" : "right"
    setActiveEvent({ event, position })
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setActiveEvent(null)
    }, 200)
  }

  const panelVariants = {
    left: {
      initial: { x: "-100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 0 },
    },
    right: {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 0 },
    },
  }

  return (
    <section ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-0">
                      <h2 className="text-8xl md:text-[200px] font-extrabold tracking-tighter text-brand-primary/5 select-none whitespace-nowrap">
              {content.timeline.heading}
            </h2>
        </div>

        <motion.div style={{ x }} className="flex items-center gap-72 pl-24 pr-24">
          <div className="absolute top-1/2 left-0 w-full h-px bg-brand-light -translate-y-1/2" />
          {events.map((event, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 group"
              onMouseEnter={(e) => handleMouseEnter(event, e.currentTarget)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 -left-4 w-4 h-4 rounded-full bg-brand-primary/50 transition-all duration-300 group-hover:bg-brand-primary"
                style={{
                  boxShadow: "0 0 0 4px rgba(255, 199, 0, 0.2), 0 0 20px 5px rgba(255, 199, 0, 0.3)",
                }}
              />
              <h3 className="text-2xl font-medium text-brand-accent group-hover:text-white transition-colors duration-300 cursor-default w-64">
                {event.title}
              </h3>
            </div>
          ))}
        </motion.div>

        <AnimatePresence>
          {activeEvent && (
            <motion.div
              className={`fixed top-16 h-[calc(100vh-4rem)] w-[450px] bg-brand-light/80 backdrop-blur-xl border-brand-light z-30 ${
                activeEvent.position === "left" ? "left-0 border-r" : "right-0 border-l"
              }`}
              variants={panelVariants[activeEvent.position]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              onMouseEnter={() => handleMouseEnter(activeEvent.event, document.body)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col h-full">
                <div className="relative w-full h-1/3">
                  <Image
                    src={activeEvent.event.image || "/placeholder.svg"}
                    alt={activeEvent.event.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-8 flex-1">
                  <h4 className="text-3xl font-bold text-brand-primary mb-4">{activeEvent.event.title}</h4>
                  <p className="text-brand-accent text-lg leading-relaxed">{activeEvent.event.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
