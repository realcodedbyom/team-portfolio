export interface Skill {
  name: string
  percentage: number
}

export interface SocialLinks {
  twitter: string
  github: string
  linkedin: string
}

export interface Member {
  id: number
  name: string
  username: string
  role: string
  avatar: string
  description: string
  skills: Skill[]
  projects: number
  experience: string
  social: SocialLinks
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  status: "completed" | "in-progress" | "planned"
  link?: string
  github?: string
}

export interface TeamStats {
  totalMembers: number
  totalProjects: number
  yearsExperience: number
  clientsSatisfied: number
}

export interface ContactForm {
  name: string
  email: string
  skills: string
  message: string
}

// Animation variants for consistent motion design
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
