"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SpinningAsciiCube } from "./spinning-ascii-cube"
import content from "@/content/site-content.json"

export const HeroSection: FC = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left md:w-1/2"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white">
              {content.hero.heading}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-brand-accent max-w-md mx-auto md:mx-0">
              Powered by <span className="text-white font-semibold">{content.hero.poweredByHighlight}</span>
              <br />
              {content.hero.tagline}
            </p>
            <Button
              size="lg"
              variant="outline"
              className="mt-8 border-2 border-brand-primary text-brand-primary font-bold rounded-full group hover:bg-brand-primary hover:text-brand-background transition-colors duration-300 px-8 py-6 text-lg bg-transparent"
            >
              {content.hero.cta.label}
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <div className="md:w-1/2 flex justify-center items-center">
            <SpinningAsciiCube />
          </div>
        </div>
      </div>
    </section>
  )
}
