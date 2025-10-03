"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  category: string
  image: string
  gradient: string
}

export default function ProjectCard({ title, category, image, gradient }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative rounded-xl overflow-hidden aspect-[4/3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gray-900/60 z-10"></div>

      <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t ${gradient} opacity-60 z-0`}></div>

      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <span className="text-sm text-gray-300 mb-2">{category}</span>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>

        <Button
          className={`w-full bg-white text-gray-900 hover:bg-gray-200 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          View Project <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
