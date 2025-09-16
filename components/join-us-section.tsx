"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Heart } from "lucide-react"
import content from "@/content/site-content.json"

export const JoinUsSection: FC = () => {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6"
              >
                <span className="text-white">WANT TO </span>
                <span className="text-brand-primary">LEARN</span>
                <span className="text-white"> MORE?</span>
              </h2>
              <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-8">{content.join.membersCount}</div>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 text-brand-accent text-lg"
              >
                <Users className="h-5 w-5 text-brand-primary" />
                <span>{content.join.bullets[0]}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3 text-brand-accent text-lg"
              >
                <BookOpen className="h-5 w-5 text-brand-primary" />
                <span>{content.join.bullets[1]}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3 text-brand-accent text-lg"
              >
                <Heart className="h-5 w-5 text-brand-primary" />
                <span>{content.join.bullets[2]}</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://discord.gg/ygR88qUwW9', '_blank')}
                className="border-2 border-brand-primary text-brand-primary font-bold rounded-full group hover:bg-brand-primary hover:text-black transition-colors duration-300 px-8 py-6 text-lg bg-transparent cursor-pointer"
              >
                {content.join.cta.label}
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-brand-accent leading-relaxed">
              {content.join.paragraphs[0]}
            </p>
            <p className="text-lg text-brand-accent leading-relaxed">
              {content.join.paragraphs[1]}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
