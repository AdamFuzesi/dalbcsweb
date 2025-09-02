"use client"

import { useEffect, useRef, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ExecTeamSection } from "@/components/exec-team-section"
import { TimelineSection } from "@/components/timeline-section"
import SponsorsSection from "@/components/sponsors-section"
import { JoinUsSection } from "@/components/join-us-section"
import { ContactSection } from "@/components/contact-section"
import { motion, useScroll, useSpring } from "framer-motion"

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("home")
  const heroRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const sponsorsRef = useRef<HTMLDivElement>(null)
  const joinRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = [heroRef, teamRef, timelineRef, sponsorsRef, joinRef, contactRef]
    sections.forEach((sectionRef) => {
      if (sectionRef.current) {
        observer.observe(sectionRef.current)
      }
    })

    return () => {
      sections.forEach((sectionRef) => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current)
        }
      })
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-black text-white flex flex-col min-h-screen font-sans">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-primary origin-left z-50" style={{ scaleX }} />
      <main className="flex-1">
        <div id="home" ref={heroRef}>
          <HeroSection />
        </div>
        <div id="team" ref={teamRef}>
          <ExecTeamSection />
        </div>
        <div id="timeline" ref={timelineRef}>
          <TimelineSection />
        </div>
        <div id="sponsors" ref={sponsorsRef}>
          <SponsorsSection />
        </div>
        <div id="join" ref={joinRef}>
          <JoinUsSection />
        </div>
        <div id="contact" ref={contactRef}>
          <ContactSection />
        </div>
      </main>
    </div>
  )
}
