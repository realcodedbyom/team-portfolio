"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Mail, Github, Linkedin, Twitter, Calendar, Award, Users, Code } from "lucide-react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import SkillBar from "@/components/skill-bar"
import type { Member } from "@/lib/types"

// Extended member data with additional profile information
const TEAM_MEMBERS: (Member & {
  bio: string
  achievements: string[]
  currentProjects: string[]
  education: { degree: string; school: string; year: string }[]
  certifications: string[]
  interests: string[]
  testimonials: { text: string; author: string; role: string }[]
})[] = [
  {
    id: 1,
    name: "Jane Doe",
    username: "@janedoe",
    role: "Designer",
    avatar: "/professional-female-designer.png",
    description:
      "Jane is an experienced designer with over 8 years in UI/UX design. She specializes in creating intuitive interfaces that enhance user experience while maintaining aesthetic appeal.",
    bio: "Jane is a passionate designer who believes that great design should be both beautiful and functional. With over 8 years of experience in the industry, she has worked with startups and Fortune 500 companies alike, helping them create digital experiences that users love. Her approach combines user research, design thinking, and cutting-edge design tools to deliver exceptional results.",
    skills: [
      { name: "UI Design", percentage: 95 },
      { name: "Prototyping", percentage: 90 },
      { name: "User Research", percentage: 85 },
      { name: "Illustration", percentage: 80 },
      { name: "Design Systems", percentage: 88 },
      { name: "Figma", percentage: 95 },
    ],
    projects: 45,
    experience: "8+ years",
    social: {
      twitter: "https://twitter.com/janedoe",
      github: "https://github.com/janedoe",
      linkedin: "https://linkedin.com/in/janedoe",
    },
    achievements: [
      "Winner of UX Design Awards 2023",
      "Featured in Design Weekly Magazine",
      "Speaker at Design Conference 2024",
      "Led design for 3 award-winning mobile apps",
    ],
    currentProjects: ["E-commerce Platform Redesign", "Mobile Banking App", "Design System Documentation"],
    education: [
      { degree: "Master of Fine Arts in Design", school: "Art Institute", year: "2016" },
      { degree: "Bachelor of Arts in Graphic Design", school: "State University", year: "2014" },
    ],
    certifications: ["Google UX Design Certificate", "Adobe Certified Expert", "Figma Advanced Certification"],
    interests: ["Digital Art", "Photography", "Sustainable Design", "Mentoring", "Travel"],
    testimonials: [
      {
        text: "Jane's design work transformed our user experience completely. Her attention to detail and user-centric approach is exceptional.",
        author: "Sarah Johnson",
        role: "Product Manager at TechCorp",
      },
      {
        text: "Working with Jane was a pleasure. She brings creativity and professionalism to every project.",
        author: "Mike Chen",
        role: "CEO at StartupXYZ",
      },
    ],
  },
  {
    id: 2,
    name: "John Smith",
    username: "@johnsmith",
    role: "Developer",
    avatar: "/professional-male-developer.png",
    description:
      "John is a full-stack developer with expertise in React, Node.js, and database management. He has successfully delivered over 30 projects throughout his career and mentors junior developers in the team.",
    bio: "John is a seasoned full-stack developer who thrives on solving complex technical challenges. With 6+ years of experience, he has built scalable web applications, APIs, and database systems for various industries. He's passionate about clean code, performance optimization, and staying up-to-date with the latest technologies. John also enjoys mentoring junior developers and contributing to open-source projects.",
    skills: [
      { name: "React", percentage: 95 },
      { name: "Node.js", percentage: 90 },
      { name: "TypeScript", percentage: 85 },
      { name: "Database Design", percentage: 80 },
      { name: "AWS", percentage: 82 },
      { name: "Python", percentage: 75 },
    ],
    projects: 30,
    experience: "6+ years",
    social: {
      twitter: "https://twitter.com/johnsmith",
      github: "https://github.com/johnsmith",
      linkedin: "https://linkedin.com/in/johnsmith",
    },
    achievements: [
      "Contributed to 15+ open-source projects",
      "AWS Certified Solutions Architect",
      "Tech lead for major e-commerce platform",
      "Mentored 20+ junior developers",
    ],
    currentProjects: ["AI Analytics Dashboard", "Microservices Architecture Migration", "Open Source React Library"],
    education: [
      { degree: "Master of Science in Computer Science", school: "Tech University", year: "2018" },
      { degree: "Bachelor of Science in Software Engineering", school: "State College", year: "2016" },
    ],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer",
      "MongoDB Certified Developer",
    ],
    interests: ["Open Source", "Machine Learning", "Rock Climbing", "Teaching", "Gaming"],
    testimonials: [
      {
        text: "John's technical expertise and problem-solving skills are outstanding. He delivered our project ahead of schedule.",
        author: "Lisa Wang",
        role: "CTO at InnovateTech",
      },
      {
        text: "John is not just a great developer, but also an excellent mentor. His code reviews helped our team grow significantly.",
        author: "David Rodriguez",
        role: "Senior Developer",
      },
    ],
  },
  {
    id: 3,
    name: "Alex Johnson",
    username: "@alexj",
    role: "Marketing",
    avatar: "/marketing-specialist-portrait.png",
    description:
      "Alex brings creative marketing strategies to the team with a background in digital marketing and content creation. They excel at social media management and SEO optimization.",
    bio: "Alex is a creative marketing strategist with a passion for storytelling and brand building. With 5+ years of experience in digital marketing, they have helped numerous companies increase their online presence and drive meaningful engagement. Alex specializes in content marketing, social media strategy, and data-driven campaigns that deliver measurable results.",
    skills: [
      { name: "Digital Marketing", percentage: 95 },
      { name: "SEO", percentage: 90 },
      { name: "Content Strategy", percentage: 85 },
      { name: "Analytics", percentage: 80 },
      { name: "Social Media", percentage: 92 },
      { name: "Email Marketing", percentage: 78 },
    ],
    projects: 25,
    experience: "5+ years",
    social: {
      twitter: "https://twitter.com/alexj",
      github: "https://github.com/alexj",
      linkedin: "https://linkedin.com/in/alexj",
    },
    achievements: [
      "Increased client engagement by 400%",
      "Google Ads Certified Professional",
      "Content Marketing Institute Speaker",
      "Built social media following of 100K+",
    ],
    currentProjects: ["Brand Awareness Campaign", "Content Marketing Strategy", "SEO Optimization Project"],
    education: [
      { degree: "Master of Business Administration", school: "Business School", year: "2019" },
      { degree: "Bachelor of Arts in Marketing", school: "University College", year: "2017" },
    ],
    certifications: ["Google Ads Certified", "HubSpot Content Marketing Certified", "Facebook Blueprint Certified"],
    interests: ["Content Creation", "Brand Strategy", "Podcasting", "Yoga", "Cooking"],
    testimonials: [
      {
        text: "Alex's marketing campaigns drove incredible results for our business. Their strategic thinking is top-notch.",
        author: "Emma Thompson",
        role: "Founder at GrowthCo",
      },
      {
        text: "Working with Alex was transformative for our brand. They understand both creativity and analytics perfectly.",
        author: "Robert Kim",
        role: "Marketing Director",
      },
    ],
  },
]

interface MemberProfilePageProps {
  params: {
    id: string
  }
}

export default function MemberProfilePage({ params }: MemberProfilePageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const member = useMemo(() => {
    const id = Number.parseInt(params.id)
    return TEAM_MEMBERS.find((m) => m.id === id)
  }, [params.id])

  if (!member) {
    notFound()
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-20" aria-labelledby="profile-heading">
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
          <Link href="/members">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground mb-8 group">
              <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Team
            </Button>
          </Link>

          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-card rounded-full p-2 border-4 border-primary/50">
                  <Image
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    width={256}
                    height={256}
                    className="rounded-full w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 id="profile-heading" className="text-4xl md:text-5xl font-extrabold mb-2 text-balance">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                  {member.name}
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-2">{member.username}</p>

              <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 text-lg px-4 py-2">
                {member.role}
              </Badge>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl text-pretty">{member.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{member.projects}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{member.experience}</div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{member.skills.length}</div>
                  <div className="text-sm text-muted-foreground">Skills</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-4">
                {member.social.twitter && (
                  <Link href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {member.social.github && (
                  <Link href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                {member.social.linkedin && (
                  <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Link href="/contact">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-10 pb-20" aria-label="Member profile details">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <Card className="bg-card border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground">About {member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">{member.bio}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Code className="h-5 w-5 text-primary" />
                          Current Projects
                        </h3>
                        <ul className="space-y-2">
                          {member.currentProjects.map((project, index) => (
                            <li key={index} className="flex items-center gap-2 text-muted-foreground">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Users className="h-5 w-5 text-secondary" />
                          Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {member.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-8">
                <Card className="bg-card border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground">Technical Skills</CardTitle>
                    <CardDescription>
                      {member.name}'s expertise across different technologies and domains
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {member.skills.map((skill, index) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          percentage={skill.percentage}
                          delay={index * 100}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-8">
                <Card className="bg-card border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground">Current Projects</CardTitle>
                    <CardDescription>Projects that {member.name} is currently working on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {member.currentProjects.map((project, index) => (
                        <Card key={index} className="bg-muted/20 border border-primary/20">
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-foreground mb-2">{project}</h3>
                            <p className="text-sm text-muted-foreground">
                              Currently in development - contributing to design and implementation.
                            </p>
                            <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                              In Progress
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-card border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {member.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-primary/30 pl-4">
                            <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                            <p className="text-muted-foreground">{edu.school}</p>
                            <p className="text-sm text-muted-foreground">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Award className="h-5 w-5 text-secondary" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {member.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-secondary rounded-full" />
                            <span className="text-foreground">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-8">
                <Card className="bg-card border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <Award className="h-6 w-6 text-accent" />
                      Key Achievements
                    </CardTitle>
                    <CardDescription>Notable accomplishments and recognition in {member.name}'s career</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {member.achievements.map((achievement, index) => (
                        <Card key={index} className="bg-accent/10 border border-accent/30">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                              <Award className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                              <p className="text-foreground font-medium">{achievement}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-8">
                <Card className="bg-card border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground">What Others Say</CardTitle>
                    <CardDescription>
                      Testimonials from colleagues and clients who have worked with {member.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {member.testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-muted/20 border border-primary/20">
                          <CardContent className="p-6">
                            <blockquote className="text-muted-foreground italic mb-4 text-lg leading-relaxed">
                              "{testimonial.text}"
                            </blockquote>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                                {testimonial.author.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">{testimonial.author}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
