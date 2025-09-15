"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./frame-component"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
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
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>({ row: 0, col: 0 })
  const [actuallyHovered, setActuallyHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(4)
  const [showControls, setShowControls] = useState(false)
  const [cleanInterface, setCleanInterface] = useState(true)
  const [autoplayMode] = useState<"hover">("hover")

  const handleFrameClick = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  const getRowSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  const updateFrameProperty = (id: number, property: keyof Frame, value: number) => {
    setFrames(frames.map((frame) => (frame.id === id ? { ...frame, [property]: value } : frame)))
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const toggleCleanInterface = () => {
    setCleanInterface(!cleanInterface)
    if (!cleanInterface) {
      setShowControls(false)
    }
  }

  return (
    <div className="space-y-4 w-full h-full">
      {!cleanInterface && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
          <div className="space-x-2">
            <Button onClick={toggleControls}>{showControls ? "Hide Controls" : "Show Controls"}</Button>
            <Button onClick={toggleCleanInterface}>{cleanInterface ? "Show UI" : "Hide UI"}</Button>
          </div>
        </div>
      )}
      {!cleanInterface && showControls && (
        <>
          <div className="space-y-2">
            <label htmlFor="hover-size" className="block text-sm font-medium text-gray-200">
              Hover Size: {hoverSize}
            </label>
            <Slider
              id="hover-size"
              min={4}
              max={8}
              step={0.1}
              value={[hoverSize]}
              onValueChange={(value) => setHoverSize(value[0])}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gap-size" className="block text-sm font-medium text-gray-200">
              Gap Size: {gapSize}px
            </label>
            <Slider
              id="gap-size"
              min={0}
              max={20}
              step={1}
              value={[gapSize]}
              onValueChange={(value) => setGapSize(value[0])}
            />
          </div>
        </>
      )}
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          return (
            <motion.div
              key={frame.id}
              className="relative cursor-pointer"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
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
                onMediaSizeChange={(value) => updateFrameProperty(frame.id, "mediaSize", value)}
                onBorderThicknessChange={(value) => updateFrameProperty(frame.id, "borderThickness", value)}
                onBorderSizeChange={(value) => updateFrameProperty(frame.id, "borderSize", value)}
                showControls={showControls && !cleanInterface}
                label={`Post ${frame.id}`}
                showFrame={false}
                autoplayMode={autoplayMode}
                isHovered={
                  actuallyHovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                  actuallyHovered?.col === Math.floor(frame.defaultPos.x / 4)
                }
                showOverlay={
                  actuallyHovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                  actuallyHovered?.col === Math.floor(frame.defaultPos.x / 4)
                }
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

