"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import content from "@/content/site-content.json"

interface HeaderProps {
  activeSection: string
  onNavigate: (id: string) => void
}

const navItems = content.site.header.nav

export const Header: FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  return (
    <header className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
