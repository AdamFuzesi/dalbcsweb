"use client"

import { useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { BlogContent } from "@/components/blog-content"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${500 - i * 8 * position} ${700 - i * 12}C-${
      250 - i * 6 * position
    } ${500 - i * 8} ${200 - i * 7 * position} ${300 - i * 10} ${
      450 - i * 5 * position
    } ${200 - i * 8}C${700 - i * 6 * position} ${100 - i * 9} ${
      900 - i * 7 * position
    } ${-100 - i * 12} ${1100 - i * 8 * position} ${-200 - i * 10}`,
    color: `rgba(255, 199, 0, ${0.05 + i * 0.02})`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
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
  title = "Block    by    Block",
  // initially blockchain society blog
}: {
  title?: string
}) {
  const words = title.split(" ")
  const blogContentRef = useRef<HTMLDivElement>(null)
  const introSectionRef = useRef<HTMLDivElement>(null)
  
  const onNavigate = useCallback((id: string) => {
    if (typeof window === "undefined") return
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }, [])

  const scrollToBlogContent = useCallback(() => {
    if (blogContentRef.current) {
      blogContentRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      })
    }
  }, [])

  // Add scroll wheel handling for seamless transitions
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const introSection = introSectionRef.current
      const blogSection = blogContentRef.current
      
      if (!introSection || !blogSection) return
      
      const introRect = introSection.getBoundingClientRect()
      const isAtIntroBottom = introRect.bottom <= window.innerHeight && introRect.top < 0
      
      // If user scrolls down from intro section, smoothly go to blog content
      if (e.deltaY > 0 && introRect.bottom > 0 && introRect.bottom <= window.innerHeight + 100) {
        e.preventDefault()
        scrollToBlogContent()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className="bg-black text-white">
      <Header activeSection={"blog"} onNavigate={onNavigate} />

      {/* First Section - Block by Block Intro */}
      <section ref={introSectionRef} className="min-h-screen relative flex flex-col">
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
          {/* Centered content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center flex flex-col items-center"
          >
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mt-32">
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

              <p className="mt-8 text-lg md:text-xl text-brand-accent max-w-md mx-auto mb-64">
                Insights, updates, and stories from <span className="text-white font-semibold">Dalhousie Blockchain Society</span>
              </p>
 
             {/* Centered button below the text */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
               className="-mt-8"
             >
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToBlogContent}
                className="border-2 border-white/20 text-white font-bold rounded-full group hover:bg-brand-primary hover:text-brand-background hover:border-brand-primary transition-all duration-300 px-8 py-6 text-lg bg-transparent backdrop-blur-sm"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">Enter Blog</span>
                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                  →
                </span>
              </Button>
             </motion.div>
           </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Second Section - Blog Content */}
      <section ref={blogContentRef} className="min-h-screen">
        <BlogContent />
      </section>
    </div>
  )
}