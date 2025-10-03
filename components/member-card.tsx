"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Github, Twitter, Linkedin, ExternalLink } from "lucide-react"
import SkillBar from "@/components/skill-bar"
import type { Member } from "@/lib/types"

interface MemberCardProps {
  member: Member
  onViewProfile?: (member: Member) => void
}

export default function MemberCard({ member, onViewProfile }: MemberCardProps) {
  const [expanded, setExpanded] = useState(false)

  const DESCRIPTION_LIMIT = 120
  const isLongDescription = member.description.length > DESCRIPTION_LIMIT
  const shortDescription = isLongDescription
    ? `${member.description.substring(0, DESCRIPTION_LIMIT).trim()}...`
    : member.description

  const [imageError, setImageError] = useState(false)

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(member)
    }
  }

  return (
    <article
      className="bg-card rounded-xl overflow-hidden border-2 border-primary/50 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20 group"
      role="article"
      aria-labelledby={`member-${member.id}-name`}
    >
      <div className="p-6">
        {/* Member Header */}
        <header className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary p-1 flex-shrink-0">
            <Image
              src={imageError ? "/placeholder.svg?height=64&width=64&query=team member avatar" : member.avatar}
              alt={`${member.name}'s profile picture`}
              fill
              className="object-cover rounded-full"
              onError={() => setImageError(true)}
              sizes="64px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 id={`member-${member.id}-name`} className="text-xl font-bold text-foreground truncate">
              {member.name}
            </h3>
            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
              <span className="text-primary text-sm font-medium">{member.username}</span>
              <span className="hidden xs:inline text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{member.role}</span>
            </div>
          </div>
        </header>

        {/* Description */}
        <div className="mb-6">
          <p className="text-muted-foreground leading-relaxed">{expanded ? member.description : shortDescription}</p>

          {isLongDescription && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-primary hover:text-primary/80 p-0 h-auto font-medium"
              aria-expanded={expanded}
              aria-controls={`member-${member.id}-description`}
            >
              {expanded ? (
                <span className="flex items-center gap-1">
                  Show less <ChevronUp className="h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  Read more <ChevronDown className="h-4 w-4" />
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">Projects</div>
            <div className="text-2xl font-bold text-secondary">{member.projects}</div>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">Experience</div>
            <div className="text-2xl font-bold text-accent">{member.experience}</div>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mb-6" aria-labelledby={`member-${member.id}-skills`}>
          <h4 id={`member-${member.id}-skills`} className="text-lg font-semibold mb-3 text-foreground">
            Skills
          </h4>
          <div className="space-y-3">
            {member.skills.map((skill, index) => (
              <SkillBar key={`${member.id}-skill-${index}`} name={skill.name} percentage={skill.percentage} compact />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="flex justify-between items-center">
          <div className="flex gap-2" role="list" aria-label="Social media links">
            <a
              href={member.social.github}
              className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary transition-colors"
              aria-label={`${member.name}'s GitHub profile`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={member.social.twitter}
              className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label={`${member.name}'s Twitter profile`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={member.social.linkedin}
              className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label={`${member.name}'s LinkedIn profile`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          <Button
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium"
            onClick={handleViewProfile}
          >
            View Profile
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </footer>
      </div>
    </article>
  )
}
