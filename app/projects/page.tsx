"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Search, ExternalLink, Github, Calendar, Users, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { fadeInUp, staggerContainer } from "@/lib/types"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  status: "completed" | "in-progress" | "planned"
  teamMembers: string[]
  startDate: string
  endDate?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with advanced features",
    longDescription:
      "A comprehensive e-commerce platform built with Next.js and Stripe integration, featuring real-time inventory management, advanced search capabilities, and seamless checkout experience.",
    image: "/modern-ecommerce-dashboard.png",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    category: "Web Development",
    status: "completed",
    teamMembers: ["John Smith", "Jane Doe", "David Kim"],
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    githubUrl: "https://github.com/teamxox/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.teamxox.com",
    featured: true,
  },
  {
    id: 2,
    title: "AI-Powered Analytics Dashboard",
    description: "Real-time analytics with machine learning insights",
    longDescription:
      "An intelligent analytics dashboard that leverages AI to provide actionable insights from complex data sets, featuring predictive analytics and automated reporting.",
    image: "/ai-analytics-dashboard.png",
    technologies: ["React", "Python", "TensorFlow", "D3.js", "FastAPI"],
    category: "AI & Machine Learning",
    status: "completed",
    teamMembers: ["David Kim", "Maria Garcia", "Alex Johnson"],
    startDate: "2024-03-01",
    endDate: "2024-08-15",
    githubUrl: "https://github.com/teamxox/ai-analytics",
    liveUrl: "https://analytics.teamxox.com",
    featured: true,
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking application",
    longDescription:
      "A comprehensive fitness tracking app with workout planning, nutrition tracking, and social features to help users achieve their health goals.",
    image: "/mobile-fitness-app-interface-workout-tracking.jpg",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
    category: "Mobile Development",
    status: "completed",
    teamMembers: ["John Smith", "Sophia Lee", "Alex Johnson"],
    startDate: "2024-02-01",
    endDate: "2024-07-20",
    githubUrl: "https://github.com/teamxox/fitness-app",
    liveUrl: "https://apps.apple.com/fitness-tracker",
    featured: false,
  },
  {
    id: 4,
    title: "Corporate Website Redesign",
    description: "Complete brand refresh and website overhaul",
    longDescription:
      "A complete redesign of a Fortune 500 company's corporate website, focusing on modern design principles, accessibility, and performance optimization.",
    image: "/modern-corporate-website-design-clean-professional.jpg",
    technologies: ["Next.js", "Framer Motion", "Sanity CMS", "Vercel"],
    category: "UI/UX Design",
    status: "completed",
    teamMembers: ["Jane Doe", "Sophia Lee", "Maria Garcia"],
    startDate: "2024-04-01",
    endDate: "2024-09-30",
    liveUrl: "https://corporate-redesign.example.com",
    featured: true,
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform",
    longDescription:
      "A decentralized voting system built on blockchain technology, ensuring transparency, security, and immutability of voting records.",
    image: "/blockchain-voting-system-interface-secure-digital.jpg",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    category: "Blockchain",
    status: "in-progress",
    teamMembers: ["David Kim", "John Smith", "Maria Garcia"],
    startDate: "2024-08-01",
    githubUrl: "https://github.com/teamxox/blockchain-voting",
    featured: false,
  },
  {
    id: 6,
    title: "Smart Home IoT Platform",
    description: "Integrated IoT solution for smart homes",
    longDescription:
      "A comprehensive IoT platform that connects and manages smart home devices, providing users with centralized control and automation capabilities.",
    image: "/smart-home-iot-dashboard-interface-modern.jpg",
    technologies: ["React", "Node.js", "MQTT", "InfluxDB", "Docker"],
    category: "IoT",
    status: "planned",
    teamMembers: ["David Kim", "John Smith"],
    startDate: "2024-12-01",
    featured: false,
  },
]

const CATEGORIES = [
  "All",
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "AI & Machine Learning",
  "Blockchain",
  "IoT",
]
const STATUS_OPTIONS = ["All", "completed", "in-progress", "planned"]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
      const matchesFeatured = !showFeaturedOnly || project.featured

      return matchesSearch && matchesCategory && matchesStatus && matchesFeatured
    })
  }, [searchTerm, selectedCategory, selectedStatus, showFeaturedOnly])

  const handleResetFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSelectedStatus("All")
    setShowFeaturedOnly(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "planned":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-20" aria-labelledby="projects-heading">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.4), transparent 40%),
              radial-gradient(circle at 70% 80%, hsl(var(--accent) / 0.4), transparent 40%)
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
            <h1 id="projects-heading" className="text-5xl md:text-6xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                Our Projects
              </span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />

            <p className="text-xl text-muted-foreground mb-12 text-pretty">
              Explore our portfolio of innovative projects spanning web development, mobile apps, AI solutions, and
              more. Each project represents our commitment to excellence and cutting-edge technology.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="max-w-5xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search projects by name, description, or technology..."
                  className="pl-10 bg-card border-2 border-border focus:border-primary text-foreground h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search projects"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Category:
                </span>
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={
                      selectedCategory === category
                        ? "bg-primary hover:bg-primary/90 text-white"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Status and Featured Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-muted-foreground">Status:</span>
                  {STATUS_OPTIONS.map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      className={
                        selectedStatus === status
                          ? "bg-secondary hover:bg-secondary/90 text-white"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status === "All" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>

                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  size="sm"
                  className={
                    showFeaturedOnly
                      ? "bg-accent hover:bg-accent/90 text-white"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                >
                  Featured Only
                </Button>

                {(searchTerm || selectedCategory !== "All" || selectedStatus !== "All" || showFeaturedOnly) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-primary hover:text-primary/80"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                Showing {filteredProjects.length} of {PROJECTS.length} projects
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10 pb-20" aria-label="Projects portfolio">
        <div className="container mx-auto px-4">
          {filteredProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={fadeInUp}>
                  <Card className="h-full bg-card border-2 border-border hover:border-primary/40 transition-all duration-300 group overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.featured && (
                        <Badge className="absolute top-3 left-3 bg-accent text-white">Featured</Badge>
                      )}
                      <Badge className={`absolute top-3 right-3 ${getStatusColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(project.startDate).getFullYear()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.teamMembers.length} members
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                      {project.liveUrl && (
                        <Button asChild size="sm" className="flex-1">
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div className="text-center py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">No projects found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters to find what you're looking for.
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
