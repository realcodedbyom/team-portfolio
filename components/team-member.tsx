"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Member {
  id: number
  name: string
  username: string
  role: string
  logo: string
  description: string
}

interface TeamMemberProps {
  member: Member
}

export default function TeamMember({ member }: TeamMemberProps) {
  const [expanded, setExpanded] = useState(false)

  // Determine if description is long enough to need expansion
  const isLongDescription = member.description.length > 150
  const shortDescription = isLongDescription ? `${member.description.substring(0, 150)}...` : member.description

  return (
    <div className="bg-gray-900 rounded-xl p-6 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-purple-900/20">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-purple-500 p-1">
            <Image
              src={member.logo || "/placeholder.svg"}
              alt={`${member.name} logo`}
              fill
              className="object-cover rounded-full"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <span className="text-purple-400 text-sm">{member.username}</span>
          </div>

          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white">
              {member.role}
            </span>
          </div>

          <div className="text-gray-300">
            <p>{expanded ? member.description : shortDescription}</p>

            {isLongDescription && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-purple-400 hover:text-purple-300 p-0 h-auto"
              >
                {expanded ? (
                  <span className="flex items-center">
                    Show less <ChevronUp className="ml-1 h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Load more <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
