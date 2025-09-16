"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BlogPost {
  id: number
  slug: string
  media: string
  mediaType: string
  title: string
  description: string
  date: string
  position: { x: number; y: number; w: number; h: number }
  content: {
    intro: string
    body: string[]
    highlights: string[]
  }
}

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const router = useRouter()

  const onNavigate = (id: string) => {
    if (typeof window === "undefined") return
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-brand-background text-white">
      <Header activeSection={"blog"} onNavigate={onNavigate} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/blog')}
            className="text-brand-accent hover:text-white hover:bg-brand-light transition-all duration-300 p-0 h-auto font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-96 md:h-[500px] mb-8 rounded-2xl overflow-hidden"
          >
            <Image
              src={post.media}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
              onError={(e) => {
                console.error(`Failed to load image: ${post.media}`, e)
              }}
              onLoad={() => {
                console.log(`Successfully loaded image: ${post.media}`)
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Date Badge */}
            <div className="absolute top-6 left-6">
              <div className="bg-brand-primary text-brand-background px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
                {post.date}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-brand-accent mb-8 leading-relaxed">
              {post.description}
            </p>

            {/* Intro */}
            <div className="mb-12">
              <p className="text-lg text-white/90 leading-relaxed font-medium italic border-l-4 border-brand-primary pl-6 py-2 bg-brand-light/30 rounded-r-lg">
                {post.content.intro}
              </p>
            </div>

            {/* Body Content */}
            <div className="prose prose-lg prose-invert max-w-none mb-12">
              {post.content.body.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-white/80 leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-brand-primary/10 to-transparent border border-brand-primary/20 rounded-2xl p-8 mb-12"
            >
              <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center">
                <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                Key Highlights
              </h3>
              <ul className="space-y-4">
                {post.content.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="flex items-start text-white/90"
                  >
                    <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    <span className="text-lg leading-relaxed">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-white/10"
            >
              <Button
                onClick={() => router.push('/blog')}
                className="bg-brand-primary text-brand-background hover:bg-brand-primary/90 font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to All Posts
              </Button>
              
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background font-bold px-8 py-3 rounded-full transition-all duration-300"
              >
                Return to Home
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
