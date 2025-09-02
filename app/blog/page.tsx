"use client"

import { useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 18 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function BackgroundPaths({
  title = "Blockchain Society Blog",
}: {
  title?: string
}) {
  const words = title.split(" ")
  const onNavigate = useCallback((id: string) => {
    if (typeof window === "undefined") return
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header activeSection={"blog"} onNavigate={onNavigate} />

      <main className="relative flex-1">
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
            {/* Left side - Button */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:w-1/2 flex justify-center md:justify-start"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/20 text-white font-bold rounded-full group hover:bg-brand-primary hover:text-brand-background hover:border-brand-primary transition-all duration-300 px-8 py-6 text-lg bg-transparent backdrop-blur-sm"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">Discover Excellence</span>
                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                  →
                </span>
              </Button>
            </motion.div>

            {/* Right side - Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center md:text-right md:w-1/2"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white">
                {words.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-3 last:mr-0">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: wordIndex * 0.08 + letterIndex * 0.02,
                          type: "spring",
                          stiffness: 140,
                          damping: 22,
                        }}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              <p className="mt-4 text-lg md:text-xl text-brand-accent max-w-md mx-auto md:mx-0 md:ml-auto">
                Insights, updates, and stories from <span className="text-white font-semibold">Dal Blockchain Society</span>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
} 