"use client"

import { type FC, useState } from "react"
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

const fastTransition: Transition = { type: "spring", stiffness: 400, damping: 30 }

const CharacterCard: FC<{ member: TeamMember; onSelect: () => void }> = ({ member, onSelect }) => {
  return (
    <motion.div
      layoutId={`card-container-${member.id}`}
      onClick={onSelect}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={fastTransition}
      className="relative h-[60vh] w-60 md:w-72 flex-shrink-0 cursor-pointer"
      style={{
        clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)",
      }}
    >
      <Image
        src={member.image || "/placeholder.svg"}
        alt={member.name}
        layout="fill"
        objectFit="cover"
        className="z-0 filter grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onDeselect}
    >
      <motion.div
        layoutId={`card-container-${member.id}`}
        transition={fastTransition}
        className="relative h-[80vh] w-[90vw] max-w-4xl bg-brand-light rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div
            className="md:w-1/2 h-1/3 md:h-full relative"
            style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }}
          >
                         <Image src={member.image || "/placeholder.svg"} alt={member.name} layout="fill" objectFit="cover" className="filter-none" />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <motion.h3 layoutId={`card-name-${member.id}`} className="text-5xl font-bold text-white">
              {member.name}
            </motion.h3>
            <motion.p layoutId={`card-role-${member.id}`} className="text-2xl text-brand-primary mt-1">
              {member.role}
            </motion.p>
            <p className="text-brand-accent mt-6 text-lg">{member.bio}</p>
            <div className="flex gap-6 mt-8">
              <a href={member.social.linkedin} className="text-brand-accent hover:text-white transition-colors">
                <Linkedin size={28} />
              </a>
              <a href={member.social.twitter} className="text-brand-accent hover:text-white transition-colors">
                <Twitter size={28} />
              </a>
            </div>
          </div>
        </div>
        <button onClick={onDeselect} className="absolute top-4 right-4 text-brand-accent hover:text-white">
          <X size={32} />
        </button>
      </motion.div>
    </motion.div>
  )
}

export const ExecTeamSection: FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

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
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-yellow-500">{content.team.heading}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-brand-accent">
            {content.team.subheading}
          </p>
        </motion.div>
        <div className="flex justify-center items-center">
          {teamMembers.map((member, index) => (
            <div key={member.id} className={index > 0 ? "md:-ml-24" : ""}>
              <CharacterCard member={member} onSelect={() => setSelectedMember(member)} />
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedMember && <MemberDetailModal member={selectedMember} onDeselect={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </section>
  )
}
