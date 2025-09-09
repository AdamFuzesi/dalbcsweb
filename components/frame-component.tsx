"use client"
import { Slider } from "@/components/ui/slider"
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
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {/* Media Content */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="w-full h-full overflow-hidden rounded-lg"
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
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
                src={media}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                onError={(e) => {
                  console.error(`Failed to load image: ${media}`, e);
                }}
                onLoad={() => {
                  console.log(`Successfully loaded image: ${media}`);
                }}
              />
            )}
          </div>
        </div>

        {/* Content Overlay - Shows on hover */}
        <div 
          className={`absolute inset-0 bg-black/80 flex flex-col justify-end p-4 transition-opacity duration-300 ${
            isHovered || autoplayMode === "all" ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 2 }}
        >
          <div className="text-white">
            <div className="text-yellow-400 text-xs font-semibold mb-1 uppercase tracking-wider">
              {date}
            </div>
            <h3 className="text-lg font-bold mb-2 leading-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-300 line-clamp-3">
              {description}
            </p>
          </div>
        </div>

        {/* Yellow Border Frame */}
        {showFrame && (
          <div 
            className="absolute inset-0 border-2 border-yellow-400/30 rounded-lg pointer-events-none"
            style={{ zIndex: 3 }}
          />
        )}
      </div>

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 z-10">
          <div className="text-white font-bold mb-2">{label}</div>
          <div className="space-y-2">
            <div>
              <label htmlFor={`media-size-${label}`} className="block text-sm font-medium text-white">
                Media Size: {mediaSize.toFixed(2)}
              </label>
              <Slider
                id={`media-size-${label}`}
                min={0.5}
                max={3}
                step={0.01}
                value={[mediaSize]}
                onValueChange={(value) => onMediaSizeChange(value[0])}
              />
            </div>
            <div>
              <label htmlFor={`border-thickness-${label}`} className="block text-sm font-medium text-white">
                Border Thickness: {borderThickness}px
              </label>
              <Slider
                id={`border-thickness-${label}`}
                min={0}
                max={20}
                step={1}
                value={[borderThickness]}
                onValueChange={(value) => onBorderThicknessChange(value[0])}
              />
            </div>
            <div>
              <label htmlFor={`border-size-${label}`} className="block text-sm font-medium text-white">
                Border Size: {borderSize}%
              </label>
              <Slider
                id={`border-size-${label}`}
                min={50}
                max={100}
                step={1}
                value={[borderSize]}
                onValueChange={(value) => onBorderSizeChange(value[0])}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

