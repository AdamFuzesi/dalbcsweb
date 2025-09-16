"use client"

import { type FC, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, type Transition } from "framer-motion"
import { Linkedin, Twitter, X } from "lucide-react"
import content from "@/content/site-content.json"

interface TeamMember {
  id: number
  name: string
  role: string
  image?: string
  bio: string
  social: { linkedin?: string; twitter?: string }
}

const teamMembers: TeamMember[] = content.team.members as TeamMember[]

const smoothTransition: Transition = { 
  type: "tween", 
  ease: "easeOut",
  duration: 0.5
}

const CharacterCard: FC<{ member: TeamMember; onSelect: () => void }> = ({ member, onSelect }) => {
  return (
    <motion.div
      layoutId={`card-container-${member.id}`}
      onClick={onSelect}
      whileHover={{ 
        scale: 1.05, 
        zIndex: 10,
        transition: { duration: 0.2 }
      }}
      className="relative h-[60vh] w-60 md:w-72 flex-shrink-0 cursor-pointer"
      style={{
        clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)",
      }}
    >
      <motion.div layoutId={`image-${member.id}`} className="relative w-full h-full">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          layout="fill"
          objectFit="cover"
          className="z-0 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </motion.div>
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <motion.h3 layoutId={`card-name-${member.id}`} className="text-2xl font-bold">
          {member.name}
        </motion.h3>
        <motion.p layoutId={`card-role-${member.id}`} className="text-brand-primary">
          {member.role}
        </motion.p>
      </div>
    </motion.div>
  )
}

const MemberDetailModal: FC<{ member: TeamMember; onDeselect: () => void }> = ({ member, onDeselect }) => {
  // Lock scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onDeselect}
    >
      <div className="relative flex items-center justify-center max-w-7xl mx-auto px-4">
        
        {/* Main Image Container with Parallelogram Shape */}
        <motion.div
          layoutId={`card-container-${member.id}`}
          className="relative h-[65vh] w-80 md:w-96 flex-shrink-0 z-20"
          style={{
            clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)",
          }}
          onClick={(e) => e.stopPropagation()}
          initial={false}
          animate={{
            scale: 1.15,
            x: -60,
            transition: {
              type: "tween",
              ease: "easeOut",
              duration: 0.4
            }
          }}
        >
          <motion.div 
            layoutId={`image-${member.id}`} 
            className="relative w-full h-full overflow-hidden"
            style={{
              clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)",
            }}
          >
            <Image 
              src={member.image || "/placeholder.svg"} 
              alt={member.name} 
              layout="fill" 
              objectFit="cover" 
              className="filter-none transition-all duration-300" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Content Panel - Slides out from the image */}
        <motion.div
          initial={{ 
            width: 0,
            x: -60,
            opacity: 0
          }}
          animate={{ 
            width: "560px",
            x: -40,
            opacity: 1
          }}
          exit={{ 
            width: 0,
            x: -60,
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeIn"
            }
          }}
          transition={{
            type: "tween",
            ease: "easeOut",
            delay: 0.2,
            duration: 0.4
          }}
          className="bg-gradient-to-r from-brand-light to-brand-light/95 h-[65vh] flex items-center shadow-2xl overflow-hidden z-10"
          style={{
            clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div 
            className="pl-20 pr-12 py-8 space-y-6 w-full max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: {
                duration: 0.2
              }
            }}
            transition={{
              delay: 0.4,
              duration: 0.3
            }}
          >
            {/* Title Section */}
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {member.name}
              </h3>
              <p className="text-2xl md:text-2xl text-yellow-400 font-light leading-tight">
                {member.role}
              </p>
            </div>
            
            {/* Divider */}
            <motion.div 
              className="h-0.5 bg-gradient-to-r from-brand-primary to-transparent w-4/5"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ 
                scaleX: 0,
                transition: { duration: 0.15 }
              }}
              transition={{ 
                delay: 0.5, 
                duration: 0.3,
                ease: "easeOut"
              }}
            />
            
            {/* Bio */}
            <motion.p 
              className="text-brand-accent text-lg md:text-xl leading-relaxed pr-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.1 }
              }}
              transition={{ 
                delay: 0.6, 
                duration: 0.3 
              }}
            >
              {member.bio}
            </motion.p>
            
            {/* Social Links */}
            <motion.div 
              className="flex gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.1 }
              }}
              transition={{ 
                delay: 0.7, 
                duration: 0.3 
              }}
            >
              {member.social.linkedin && (
                <motion.a 
                  href={member.social.linkedin} 
                  className="text-brand-accent hover:text-brand-primary transition-colors duration-300 transform hover:scale-110"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={28} />
                </motion.a>
              )}
              {member.social.twitter && (
                <motion.a 
                  href={member.social.twitter} 
                  className="text-brand-accent hover:text-brand-primary transition-colors duration-300 transform hover:scale-110"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter size={28} />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Close Button */}
        <motion.button 
          onClick={onDeselect}
          className="absolute top-6 right-6 text-white hover:text-brand-primary transition-colors duration-300 z-30 bg-black/50 hover:bg-black/70 rounded-full p-3 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            transition: { duration: 0.2 }
          }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export const ExecTeamSection: FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const handleMemberSelect = (member: TeamMember) => {
    setSelectedMember(member)
  }

  const handleMemberDeselect = () => {
    setSelectedMember(null)
  }

  return (
    <section className="py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-7xl md:text-8xl font-bold tracking-tight">
            <span className="text-white">Meet The </span>
            <span className="text-yellow-400">Team</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-white">
            {content.team.subheading}
          </p>
        </motion.div>
        <div className="flex justify-center items-center">
          {teamMembers.map((member, index) => (
            <div key={member.id} className={index > 0 ? "md:-ml-24" : ""}>
              <CharacterCard member={member} onSelect={() => handleMemberSelect(member)} />
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {selectedMember && (
          <MemberDetailModal 
            key={selectedMember.id}
            member={selectedMember} 
            onDeselect={handleMemberDeselect} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}