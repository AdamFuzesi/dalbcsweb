"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./frame-component"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface Frame {
  id: number
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

const initialFrames: Frame[] = [
  {
    id: 1,
    media: "/Events/EF Campus Tour/photo_1_2025-08-14_15-51-30.jpg",
    mediaType: "image",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    title: "Ethereum Foundation Campus Tour",
    description: "Hosting the Ethereum Foundation team for an exclusive campus tour and blockchain education session.",
    date: "August 2024",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 2,
    media: "/Events/First Fall 2024 Meeting/photo_1_2025-08-14_15-58-23.jpg",
    mediaType: "image",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    title: "First Fall 2024 Meeting",
    description: "Kicking off the new academic year with our largest membership meeting to date.",
    date: "September 2024",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 3,
    media: "/Events/Pizza Day/photo_1_2025-08-14_15-55-08.jpg",
    mediaType: "image",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    title: "Community Pizza Day",
    description: "Building connections and fostering community through our monthly pizza networking events.",
    date: "October 2024",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 4,
    media: "/Travel Pics/Toronto/IMG_7153.JPG",
    mediaType: "image",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    title: "Toronto Blockchain Conference",
    description: "Representing Dal Blockchain at major industry conferences and networking events.",
    date: "November 2024",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 5,
    media: "/Travel Pics/Denver/photo_10_2025-03-18_15-48-03.jpg",
    mediaType: "image",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    title: "Denver Blockchain Summit",
    description: "Participating in hackathons and learning from industry leaders in the blockchain space.",
    date: "March 2024",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 6,
    media: "/Travel Pics/Turkiye/IMG_6564 (1).JPG",
    mediaType: "image",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    title: "International Research Collaboration",
    description: "Collaborating with international institutions on blockchain research and development.",
    date: "June 2024",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 7,
    media: "/Travel Pics/Vienna/crabvienna.jpeg",
    mediaType: "image",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    title: "Vienna Blockchain Week",
    description: "Attending Europe's premier blockchain conference and representing Canadian blockchain education.",
    date: "May 2024",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 8,
    media: "/Travel Pics/Michigan/photo_1_2025-07-22_16-24-36.jpg",
    mediaType: "image",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    title: "Michigan Blockchain Alliance",
    description: "Partnering with US universities to advance blockchain education and research initiatives.",
    date: "July 2024",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
  {
    id: 9,
    media: "/Headshots/ADAM.png",
    mediaType: "image",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    title: "Leadership Spotlight",
    description: "Meet the team behind Dal Blockchain Society and learn about our vision for the future.",
    date: "December 2024",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
  },
]

export function DynamicFrameLayout() {
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(4)
  const [showControls, setShowControls] = useState(false)
  const [cleanInterface, setCleanInterface] = useState(true)
  const [showFrames, setShowFrames] = useState(false)
  const [autoplayMode, setAutoplayMode] = useState<"all" | "hover">("all")

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
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="frame-toggle" checked={showFrames} onCheckedChange={setShowFrames} />
            <label htmlFor="frame-toggle" className="text-sm text-white/70">
              {showFrames ? "Hide Frames" : "Show Frames"}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="autoplay-toggle"
              checked={autoplayMode === "all"}
              onCheckedChange={(checked) => setAutoplayMode(checked ? "all" : "hover")}
            />
            <label htmlFor="autoplay-toggle" className="text-sm text-white/70">
              {autoplayMode === "all" ? "Always Show" : "Show on Hover"}
            </label>
          </div>
        </div>
      </div>
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
              className="relative"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
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
                showFrame={showFrames}
                autoplayMode={autoplayMode}
                isHovered={
                  hovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                  hovered?.col === Math.floor(frame.defaultPos.x / 4)
                }
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

