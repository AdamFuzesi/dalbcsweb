"use client"

import { useState } from "react"
import { DynamicFrameLayout } from "./dynamic-frame-layout"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

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
              className="text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]"
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              Block
              <br />
              by
              <br />
              Block?
            </h1>
            <div
              className="flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]"
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-white/10 w-full" />
                <p>
                  Dal Blockchain Society is building the future of blockchain education and innovation at the university level. 
                  Through our blog, we share insights, updates, and stories from our journey in the blockchain space.
                </p>
                <p>
                  From hackathons and conferences to research publications and industry partnerships, 
                  we document our experiences and learnings to inspire the next generation of blockchain enthusiasts.
                </p>
                <p>Here are some of our recent highlights and stories.</p>
                <div className="h-px bg-white/10 w-full" />
              </div>
            </div>
            <Link
              href="/"
              className="w-8 h-8 relative opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Dal Blockchain Society Logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>
          <Button
            className="inline-block px-6 py-3 text-white/70 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors text-center w-full max-w-[260px] text-sm mt-16"
            variant="outline"
          >
            Join Our Community
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

