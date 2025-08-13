"use client"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

/*
  Program component copied from my previous project in C code.
*/


export const SpinningAsciiCube = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [cubeFrame, setCubeFrame] = useState("")
  const animationRef = useRef<number>()
  const angleRef = useRef({ A: 0, B: 0, C: 0 })

  //terminal based emulation
  const width = 60
  const height = 30
  const cubeWidth = 15
  const camDistance = 35
  const K1 = 25

  // 3d prjection based off the z index
  const calculateX = (i: number, j: number, k: number, A: number, B: number, C: number) => {
    return (
      j * Math.sin(A) * Math.sin(B) * Math.cos(C) -
      k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
      j * Math.cos(A) * Math.sin(C) +
      k * Math.sin(A) * Math.sin(C) +
      i * Math.cos(B) * Math.cos(C)
    )
  }

  const calculateY = (i: number, j: number, k: number, A: number, B: number, C: number) => {
    return (
      j * Math.cos(A) * Math.cos(C) +
      k * Math.sin(A) * Math.cos(C) -
      j * Math.sin(A) * Math.sin(B) * Math.sin(C) +
      k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
      i * Math.cos(B) * Math.sin(C)
    )
  }

  const calculateZ = (i: number, j: number, k: number, A: number, B: number, C: number) => {
    return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + i * Math.sin(B)
  }

  const calculateForSurface = (
    cubeX: number,
    cubeY: number,
    cubeZ: number,
    ch: string,
    buffer: string[],
    zBuffer: number[],
    A: number,
    B: number,
    C: number,
  ) => {
    const x = calculateX(cubeX, cubeY, cubeZ, A, B, C)
    const y = calculateY(cubeX, cubeY, cubeZ, A, B, C)
    const z = calculateZ(cubeX, cubeY, cubeZ, A, B, C) + camDistance

    if (z <= 0) return // dont need this offset

    const ooz = 1 / z
    const aspectRatio = height / width
    const xp = Math.floor(width / 2 + K1 * ooz * x)
    const yp = Math.floor(height / 2 - K1 * ooz * y * aspectRatio)

    const idx = xp + yp * width

    if (idx >= 0 && idx < width * height && xp >= 0 && xp < width && yp >= 0 && yp < height) {
      if (ooz > zBuffer[idx]) {
        zBuffer[idx] = ooz
        buffer[idx] = ch
      }
    }
  }

  const renderCube = () => {
    const buffer = new Array(width * height).fill(" ")
    const zBuffer = new Array(width * height).fill(0)
    const { A, B, C } = angleRef.current

    // Finer increment for more detailed rendering
    const incrementSpeed = 0.5

    // Render each face with distinct characters for better visibility
    for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
      for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
        // front
        calculateForSurface(cubeX, cubeY, -cubeWidth, ".", buffer, zBuffer, A, B, C)

        // right hash
        calculateForSurface(cubeWidth, cubeY, cubeX, "#", buffer, zBuffer, A, B, C)

        // left ampersand
        calculateForSurface(-cubeWidth, cubeX, -cubeY, "&", buffer, zBuffer, A, B, C)

        // back tildes
        calculateForSurface(-cubeX, cubeY, cubeWidth, "~", buffer, zBuffer, A, B, C)

        // bottom dollar signs
        calculateForSurface(cubeX, -cubeWidth, cubeY, "$", buffer, zBuffer, A, B, C)

        // @ symbols bottom side
        calculateForSurface(cubeX, cubeWidth, cubeY, "@", buffer, zBuffer, A, B, C)
      }
    }

    // edge definitions all accounting for z offset
    const edgeIncrement = 1.0
    for (let t = -cubeWidth; t < cubeWidth; t += edgeIncrement) {
      // Vertical 
      calculateForSurface(-cubeWidth, -cubeWidth, t, "|", buffer, zBuffer, A, B, C)
      calculateForSurface(cubeWidth, -cubeWidth, t, "|", buffer, zBuffer, A, B, C)
      calculateForSurface(-cubeWidth, cubeWidth, t, "|", buffer, zBuffer, A, B, C)
      calculateForSurface(cubeWidth, cubeWidth, t, "|", buffer, zBuffer, A, B, C)

      // Horizontal 
      calculateForSurface(t, -cubeWidth, -cubeWidth, "-", buffer, zBuffer, A, B, C)
      calculateForSurface(t, cubeWidth, -cubeWidth, "-", buffer, zBuffer, A, B, C)
      calculateForSurface(t, -cubeWidth, cubeWidth, "-", buffer, zBuffer, A, B, C)
      calculateForSurface(t, cubeWidth, cubeWidth, "-", buffer, zBuffer, A, B, C)

      // Depth 
      calculateForSurface(-cubeWidth, t, -cubeWidth, "/", buffer, zBuffer, A, B, C)
      calculateForSurface(cubeWidth, t, -cubeWidth, "\\", buffer, zBuffer, A, B, C)
      calculateForSurface(-cubeWidth, t, cubeWidth, "\\", buffer, zBuffer, A, B, C)
      calculateForSurface(cubeWidth, t, cubeWidth, "/", buffer, zBuffer, A, B, C)
    }

    let result = ""
    for (let k = 0; k < width * height; k++) {
      result += k % width === 0 && k !== 0 ? "\n" + buffer[k] : buffer[k]
    }

    setCubeFrame(result)

    const baseSpeed = 0.012
    const speedMultiplier = isHovered ? 2.5 : 1
    angleRef.current.A += baseSpeed * speedMultiplier
    angleRef.current.B += baseSpeed * 0.7 * speedMultiplier
    angleRef.current.C += baseSpeed * 1.3 * speedMultiplier
  }

  useEffect(() => {
    const animate = () => {
      renderCube()
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* alter font for terminal effect */}
      <div className="relative z-10">
        <pre
          className={`font-mono leading-tight select-none transition-all duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          style={{
            fontFamily: 'Monaco, "Lucida Console", "Courier New", monospace',
            fontSize: "16px",
            lineHeight: "18px",
            letterSpacing: "0px",
            color: "white",
            opacity: isHovered ? 1 : 0.95,
            whiteSpace: "pre",
            textAlign: "center",
          }}
        >
          {cubeFrame}
        </pre>
      </div>
    </motion.div>
  )
}