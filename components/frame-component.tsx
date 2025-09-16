"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"

interface FrameComponentProps {
  media: string
  mediaType: "video" | "image"
  width: number | string
  height: number | string
  className?: string
  title: string
  description: string
  date: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  onMediaSizeChange: (value: number) => void
  onBorderThicknessChange: (value: number) => void
  onBorderSizeChange: (value: number) => void
  showControls: boolean
  label: string
  showFrame: boolean
  autoplayMode: "all" | "hover"
  isHovered: boolean
  showOverlay?: boolean
}

export function FrameComponent({
  media,
  mediaType,
  width,
  height,
  className = "",
  title,
  description,
  date,
  mediaSize,
  borderThickness,
  borderSize,
  onMediaSizeChange,
  onBorderThicknessChange,
  onBorderSizeChange,
  showControls,
  label,
  showFrame,
  autoplayMode,
  isHovered,
  showOverlay = true,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (mediaType === "video") {
      if (autoplayMode === "all") {
        videoRef.current?.play()
      } else if (autoplayMode === "hover") {
        if (isHovered) {
          videoRef.current?.play()
        } else {
          videoRef.current?.pause()
        }
      }
    }
  }, [isHovered, autoplayMode, mediaType])

  return (
    <div
      className={`relative group ${className}`}
      style={{
        width,
        height,
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
        {/* Media Content */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `scale(${isHovered ? 1.02 : 1})`,
          }}
        >
          <div
            className="w-full h-full overflow-hidden rounded-2xl"
            style={{
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {mediaType === "video" ? (
              <video
                className="w-full h-full object-cover"
                src={media}
                loop
                muted
                playsInline
                autoPlay={autoplayMode === "all" || (autoplayMode === "hover" && isHovered)}
                ref={videoRef}
              />
            ) : (
              <Image
                src={media || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-all duration-700 ease-out"
                style={{
                  filter: isHovered ? "brightness(1.1) contrast(1.05)" : "brightness(0.95)",
                }}
                sizes="(max-width: 768px) 100vw, 33vw"
                onError={(e) => {
                  console.error(`Failed to load image: ${media}`, e)
                }}
                onLoad={() => {
                  console.log(`Successfully loaded image: ${media}`)
                }}
              />
            )}
          </div>
        </div>

        <div
          className={`absolute inset-0 flex flex-col justify-end transition-all duration-500 ease-out ${
            isHovered && showOverlay ? "opacity-100" : "opacity-0"
          }`}
          style={{
            zIndex: 2,
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        >
          <div className="p-6 text-white">
            <div className="text-zinc-400 text-xs font-medium mb-2 uppercase tracking-widest">{date}</div>
            <h3 className="text-xl font-semibold mb-3 leading-tight text-balance">{title}</h3>
            <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">{description}</p>
          </div>
        </div>

        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 ${
            isHovered ? "ring-1 ring-white/20" : ""
          }`}
          style={{ zIndex: 3 }}
        />
      </div>
    </div>
  )
}