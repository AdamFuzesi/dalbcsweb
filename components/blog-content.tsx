"use client"

import { DynamicFrameLayout } from "./dynamic-frame-layout"
import { Button } from "@/components/ui/button"
import siteContent from "@/content/site-content.json"

export function BlogContent() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl h-full flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
        <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-12">
            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter leading-[0.9] text-balance">
                {siteContent.blog.content.title.split("\n").map((line, index) => (
                  <span key={index} className="block">
                    {line === "Word?" ? (
                      <span className="text-yellow-400">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h1>

              {/* Subtle accent line */}
              <div className="w-16 h-px bg-gradient-to-r from-white/40 to-transparent" />
            </div>

            {/* Content paragraphs */}
            <div className="text-xl md:text-lg text-brand-accent mb-8 leading-relaxed">
              {siteContent.blog.content.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-16">
            <Button
              className="group relative px-8 py-4 text-white/80 border border-white/20 rounded-full font-medium hover:bg-white/5 hover:border-white/30 transition-all duration-300 text-center w-full max-w-[280px] text-sm backdrop-blur-sm overflow-hidden bg-transparent"
              variant="outline"
            >
              <span className="relative z-10">{siteContent.blog.content.ctaButton}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>

        <div className="w-full lg:flex-grow h-[60vh] sm:h-[70vh] lg:h-[85vh]">
          <DynamicFrameLayout />
        </div>
      </div>
    </div>
  )
}