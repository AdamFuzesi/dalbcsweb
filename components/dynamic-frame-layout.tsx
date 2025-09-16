"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./frame-component"
import siteContent from "@/content/site-content.json"
import { useRouter } from "next/navigation"

interface Frame {
  id: number
  slug: string
  media: string
  mediaType: "video" | "image"
  defaultPos: { x: number; y: number; w: number; h: number }
  title: string
  description: string
  date: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  autoplayMode: "all" | "hover"
  isHovered: boolean
}

// Convert blog posts from JSON to Frame format
const initialFrames: Frame[] = siteContent.blog.posts.map((post) => ({
  id: post.id,
  slug: post.slug,
  media: post.media,
  mediaType: post.mediaType as "video" | "image",
  defaultPos: { x: post.position.x, y: post.position.y, w: post.position.w, h: post.position.h },
  title: post.title,
  description: post.description,
  date: post.date,
  mediaSize: 1,
  borderThickness: 0,
  borderSize: 80,
  autoplayMode: "all" as const,
  isHovered: false,
}))

export function DynamicFrameLayout() {
  const router = useRouter()
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>({ row: 0, col: 0 })
  const [actuallyHovered, setActuallyHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize] = useState(7)
  const [gapSize] = useState(8)

  const handleFrameClick = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  const getRowSizes = () => {
    if (hovered === null) {
      return "1fr 1fr 1fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "1fr 1fr 1fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  return (
    <div className="w-full h-full">
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const isCurrentlyHovered = actuallyHovered?.row === row && actuallyHovered?.col === col

          return (
            <motion.div
              key={frame.id}
              className="relative cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: frame.id * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              onMouseEnter={() => {
                setHovered({ row, col })
                setActuallyHovered({ row, col })
              }}
              onMouseLeave={() => {
                setHovered({ row: 0, col: 0 })
                setActuallyHovered(null)
              }}
              onClick={() => handleFrameClick(frame.slug)}
            >
              <FrameComponent
                media={frame.media}
                mediaType={frame.mediaType}
                width="100%"
                height="100%"
                className="absolute inset-0"
                title={frame.title}
                description={frame.description}
                date={frame.date}
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                onMediaSizeChange={() => {}}
                onBorderThicknessChange={() => {}}
                onBorderSizeChange={() => {}}
                showControls={false}
                label={`Post ${frame.id}`}
                showFrame={false}
                autoplayMode="hover"
                isHovered={isCurrentlyHovered}
                showOverlay={isCurrentlyHovered}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}