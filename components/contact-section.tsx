"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"

export const ContactSection: FC = () => {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="bg-transparent border-0 border-b-2 border-brand-accent/30 text-white placeholder:text-brand-accent/60 h-14 rounded-none focus:border-brand-primary focus:ring-0 text-lg px-0 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent border-0 border-b-2 border-brand-accent/30 text-white placeholder:text-brand-accent/60 h-14 rounded-none focus:border-brand-primary focus:ring-0 text-lg px-0 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Message"
                    className="bg-transparent border-0 border-b-2 border-brand-accent/30 text-white placeholder:text-brand-accent/60 rounded-none focus:border-brand-primary focus:ring-0 text-lg px-0 min-h-[100px] resize-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="pt-8">
                <Button
                  size="lg"
                  variant="ghost"
                  className="group p-0 h-auto bg-transparent hover:bg-transparent text-brand-primary font-medium text-lg"
                >
                  <span className="relative">
                    Send Message
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-brand-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-2 transition-all duration-300" />
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center lg:justify-end h-full"
          >
            <div className="relative">
                            <h2
                 className="text-8xl md:text-9xl lg:text-[12rem] font-extrabold tracking-tighter leading-none select-none text-brand-primary"
                 style={{
                   writingMode: "vertical-rl",
                   textOrientation: "mixed"
                 }}
               >
                GET IN TOUCH
              </h2>

              <div className="absolute -left-8 top-0 w-px h-full bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}