"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import content from "@/content/site-content.json"

export const ContactSection: FC = () => {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-brand-primary">{content.contact.heading}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-brand-accent">
            {content.contact.subheading}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto rounded-2xl border border-brand-light/40 bg-brand-light/20 p-8"
        >
          <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder={content.contact.form.namePlaceholder}
                className="bg-black/30 border border-white/10 text-white placeholder:text-white/40 h-12 rounded-md focus:border-brand-primary"
              />
              <Input
                type="email"
                placeholder={content.contact.form.emailPlaceholder}
                className="bg-black/30 border border-white/10 text-white placeholder:text-white/40 h-12 rounded-md focus:border-brand-primary"
              />
            </div>
            <Textarea
                placeholder={content.contact.form.messagePlaceholder}
                className="bg-black/30 border border-white/10 text-white placeholder:text-white/40 min-h-[150px] rounded-md focus:border-brand-primary"
              />
            <div className="pt-2 flex justify-end">
              <Button
                size="lg"
                variant="outline"
                className="border border-brand-primary text-brand-primary font-semibold rounded-md group hover:bg-brand-primary hover:text-black transition-colors duration-300 px-6 py-5 text-base bg-transparent"
              >
                {content.contact.form.submitLabel}
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
