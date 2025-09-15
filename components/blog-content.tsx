"use client"

import { useState } from "react"
import { DynamicFrameLayout } from "./dynamic-frame-layout"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import siteContent from "@/content/site-content.json"

export function BlogContent() {
  const [headerSize] = useState(1.2) // 120% is the default size
  const [textSize] = useState(0.8) // 80% is the default size

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/* Left Content */}
        <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-16">
            <h1
              className="text-4xl md:text-6xl font-light text-white/80 tracking-tighter leading-[130%]"
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              {siteContent.blog.content.title.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < siteContent.blog.content.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            <div
              className="flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]"
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-white/10 w-full" />
                {siteContent.blog.content.paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
                <div className="h-px bg-white/10 w-full" />
              </div>
            </div>
          </div>
          <Button
            className="inline-block px-6 py-3 text-white/70 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors text-center w-full max-w-[260px] text-sm mt-16"
            variant="outline"
          >
            {siteContent.blog.content.ctaButton}
          </Button>
        </div>

        {/* Right Content */}
        <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
          <DynamicFrameLayout />
        </div>
      </div>
    </div>
  )
}

