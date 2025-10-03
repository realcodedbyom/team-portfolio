"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Search, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import MemberCard from "@/components/member-card"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { Member } from "@/lib/types"
import { TEAM_ROLES } from "@/lib/constants"
import { fadeInUp, staggerContainer } from "@/lib/types"

const TEAM_MEMBERS: Member[] = [
  {
    id: 1,
    name: "Jane Doe",
    username: "@janedoe",
    role: "Designer",
    avatar: "/professional-female-designer.png",
    description:
      "Jane is an experienced designer with over 8 years in UI/UX design. She specializes in creating intuitive interfaces that enhance user experience while maintaining aesthetic appeal.",
    skills: [
      { name: "UI Design", percentage: 95 },
      { name: "Prototyping", percentage: 90 },
      { name: "User Research", percentage: 85 },
      { name: "Illustration", percentage: 80 },
    ],
    projects: 45,
    experience: "8+ years",
    social: {
      twitter: "https://twitter.com/janedoe",
      github: "https://github.com/janedoe",
      linkedin: "https://linkedin.com/in/janedoe",
    },
  },
  {
    id: 2,
    name: "John Smith",
    username: "@johnsmith",
    role: "Developer",
    avatar: "/professional-male-developer.png",
    description:
      "John is a full-stack developer with expertise in React, Node.js, and database management. He has successfully delivered over 30 projects throughout his career and mentors junior developers in the team.",
    skills: [
      { name: "React", percentage: 95 },
      { name: "Node.js", percentage: 90 },
      { name: "TypeScript", percentage: 85 },
      { name: "Database Design", percentage: 80 },
    ],
    projects: 30,
    experience: "6+ years",
    social: {
      twitter: "https://twitter.com/johnsmith",
      github: "https://github.com/johnsmith",
      linkedin: "https://linkedin.com/in/johnsmith",
    },
  },
  {
    id: 3,
    name: "Alex Johnson",
    username: "@alexj",
    role: "Marketing",
    avatar: "/marketing-specialist-portrait.png",
    description:
      "Alex brings creative marketing strategies to the team with a background in digital marketing and content creation. They excel at social media management and SEO optimization.",
    skills: [
      { name: "Digital Marketing", percentage: 95 },
      { name: "SEO", percentage: 90 },
      { name: "Content Strategy", percentage: 85 },
      { name: "Analytics", percentage: 80 },
    ],
    projects: 25,
    experience: "5+ years",
    social: {
      twitter: "https://twitter.com/alexj",
      github: "https://github.com/alexj",
      linkedin: "https://linkedin.com/in/alexj",
    },
  },
  {
    id: 4,
    name: "Maria Garcia",
    username: "@mariag",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=120&width=120",
    description:
      "Maria is a certified project manager with a strong background in agile methodologies. She ensures that all projects are delivered on time and within budget while maintaining the highest quality standards.",
    skills: [
      { name: "Agile", percentage: 95 },
      { name: "Scrum", percentage: 90 },
      { name: "Risk Management", percentage: 85 },
      { name: "Team Leadership", percentage: 80 },
    ],
    projects: 38,
    experience: "7+ years",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 5,
    name: "David Kim",
    username: "@davidk",
    role: "Developer",
    avatar: "/placeholder.svg?height=120&width=120",
    description:
      "David specializes in building robust and scalable backend systems. His expertise in cloud architecture and microservices has been instrumental in developing high-performance applications for our enterprise clients.",
    skills: [
      { name: "Python", percentage: 95 },
      { name: "AWS", percentage: 90 },
      { name: "Microservices", percentage: 85 },
      { name: "Database Optimization", percentage: 80 },
    ],
    projects: 22,
    experience: "4+ years",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: 6,
    name: "Sophia Lee",
    username: "@sophial",
    role: "Designer",
    avatar: "/placeholder.svg?height=120&width=120",
    description:
      "Sophia has an eye for detail and a passion for creating beautiful, functional interfaces. Her designs combine aesthetic appeal with usability principles to deliver exceptional user experiences.",
    skills: [
      { name: "UI Design", percentage: 95 },
      { name: "Wireframing", percentage: 90 },
      { name: "Figma", percentage: 85 },
      { name: "Design Systems", percentage: 80 },
    ],
    projects: 28,
    experience: "5+ years",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("All")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredMembers = useMemo(() => {
    try {
      return TEAM_MEMBERS.filter((member) => {
        const matchesSearch =
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesRole = selectedRole === "All" || member.role === selectedRole

        return matchesSearch && matchesRole
      })
    } catch (err) {
      setError("Failed to filter team members")
      return []
    }
  }, [searchTerm, selectedRole])

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
    setError(null)
  }, [])

  const handleRoleChange = useCallback((role: string) => {
    setSelectedRole(role)
    setError(null)
  }, [])

  const handleResetFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedRole("All")
    setError(null)
  }, [])

  const handleRetry = useCallback(() => {
    setError(null)
    setIsLoading(true)
    // Simulate retry delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleMemberProfileView = useCallback((member: Member) => {
    // Handle member profile view - could navigate to detailed view
    console.log("Viewing profile for:", member.name)
  }, [])

  if (error && !filteredMembers.length && searchTerm === "" && selectedRole === "All") {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-destructive text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={handleRetry} className="bg-primary hover:bg-primary/90">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-20" aria-labelledby="members-heading">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.4), transparent 40%),
              radial-gradient(circle at 70% 80%, hsl(var(--secondary) / 0.4), transparent 40%)
            `,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground mb-8 group">
              <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 id="members-heading" className="text-5xl md:text-6xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                Meet Our Team
              </span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-6" />

            <p className="text-xl text-muted-foreground mb-12 text-pretty">
              Our diverse team of experts brings together a wealth of knowledge and experience across various
              disciplines. Each member contributes unique skills and perspectives to our collective success.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search team members..."
                  className="pl-10 bg-card border-2 border-border focus:border-primary text-foreground h-12"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  aria-label="Search team members by name, username, or role"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0" role="tablist" aria-label="Filter by role">
                {TEAM_ROLES.map((role) => (
                  <Button
                    key={role}
                    variant={selectedRole === role ? "default" : "outline"}
                    className={
                      selectedRole === role
                        ? "bg-primary hover:bg-primary/90 text-white whitespace-nowrap"
                        : "border-border text-muted-foreground hover:bg-muted whitespace-nowrap"
                    }
                    onClick={() => handleRoleChange(role)}
                    role="tab"
                    aria-selected={selectedRole === role}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            {(searchTerm || selectedRole !== "All") && (
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Showing {filteredMembers.length} of {TEAM_MEMBERS.length} members
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedRole !== "All" && ` in ${selectedRole}`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-primary hover:text-primary/80"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-10 pb-20" aria-label="Team members">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : error && filteredMembers.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-destructive text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Unable to load team members</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={handleRetry} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          ) : filteredMembers.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredMembers.map((member) => (
                <motion.div key={member.id} variants={fadeInUp}>
                  <MemberCard member={member} onViewProfile={handleMemberProfileView} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div className="text-center py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">No team members found</h2>
              <p className="text-muted-foreground mb-6">
                {searchTerm
                  ? `No members match "${searchTerm}"${selectedRole !== "All" ? ` in ${selectedRole}` : ""}`
                  : `No members found in ${selectedRole}`}
              </p>
              <Button onClick={handleResetFilters} className="bg-primary hover:bg-primary/90 text-white">
                Reset Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
