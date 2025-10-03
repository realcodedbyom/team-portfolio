"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { Member } from "@/lib/types"

interface TeamMemberPreviewProps {
  member: Pick<Member, "id" | "name" | "role" | "avatar">
}

export default function TeamMemberPreview({ member }: TeamMemberPreviewProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.article
      className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer bg-card border border-border"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      role="article"
      aria-labelledby={`preview-${member.id}-name`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

      <Image
        src={imageError ? "/placeholder.svg?height=400&width=300&query=team member portrait" : member.avatar}
        alt={`${member.name} - ${member.role}`}
        fill
        className="object-cover z-0 transition-transform duration-500 group-hover:scale-110"
        onError={() => setImageError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />

      <div className="absolute inset-x-0 bottom-0 p-6 z-20">
        <h3 id={`preview-${member.id}-name`} className="text-2xl font-bold text-foreground mb-1 text-balance">
          {member.name}
        </h3>
        <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wide">{member.role}</p>

        <Link href={`/members?highlight=${member.id}`} className="block">
          <Button
            className="w-full bg-background/20 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/30 hover:border-primary/50 transition-all duration-300 group-hover:translate-y-0 translate-y-2"
            size="sm"
          >
            View Profile
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5" />
    </motion.article>
  )
}
