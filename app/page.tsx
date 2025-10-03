"use client"

import { useState, useMemo, lazy, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, ChevronRight, Code, Rocket, Trophy, Zap, ArrowRight, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import SkillBar from "@/components/skill-bar"
import TeamMemberPreview from "@/components/team-member-preview"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { fadeInUp, staggerContainer } from "@/lib/types"

const JoinTeamModal = lazy(() => import("@/components/modals/join-team-modal"))

export default function Home() {
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)

  const teamMembers = useMemo(
    () => [
      {
        id: 1,
        name: "Jane Doe",
        role: "Lead Designer",
        avatar: "/professional-female-designer.png",
      },
      {
        id: 2,
        name: "John Smith",
        role: "Senior Developer",
        avatar: "/professional-male-developer.png",
      },
      {
        id: 3,
        name: "Alex Johnson",
        role: "Marketing Specialist",
        avatar: "/marketing-specialist-portrait.png",
      },
    ],
    [],
  )

  const teamSkills = useMemo(
    () => [
      { name: "Web Development", percentage: 95 },
      { name: "UI/UX Design", percentage: 90 },
      { name: "Mobile Development", percentage: 85 },
      { name: "Game Development", percentage: 80 },
      { name: "AI & Machine Learning", percentage: 75 },
    ],
    [],
  )

  const coreValues = useMemo(
    () => [
      {
        icon: Code,
        title: "Innovation",
        description: "We constantly push boundaries and explore new technologies to stay ahead of the curve.",
        color: "primary",
      },
      {
        icon: Trophy,
        title: "Excellence",
        description: "We strive for perfection in everything we do, setting high standards for our work.",
        color: "accent",
      },
      {
        icon: Zap,
        title: "Collaboration",
        description: "We believe in the power of teamwork and diverse perspectives to create exceptional results.",
        color: "secondary",
      },
    ],
    [],
  )

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center" aria-labelledby="hero-heading">
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.4), transparent 40%),
              radial-gradient(circle at 70% 80%, hsl(var(--secondary) / 0.4), transparent 40%),
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
            maskImage: "radial-gradient(ellipse at center, transparent 20%, black 70%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                id="hero-heading"
                className="text-5xl md:text-7xl font-extrabold mb-6 text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                  TEAM XOX
                </span>
              </motion.h1>

              <motion.h2
                className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Where Innovation Meets Excellence
              </motion.h2>

              <motion.div
                className="h-1 w-32 bg-gradient-to-r from-primary to-secondary mx-auto lg:mx-0 mb-8"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              <motion.p
                className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 text-pretty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Join our elite team of creators, innovators, and digital pioneers. We're pushing boundaries and
                redefining what's possible in the digital realm.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Link href="/members">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold"
                  >
                    Meet The Team
                    <Users className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-secondary text-secondary hover:bg-secondary/10 font-bold bg-transparent"
                  onClick={() => setIsJoinFormOpen(true)}
                >
                  Join Our Team
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="flex-1 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-card rounded-full p-3 border-2 border-primary/50">
                  <Image
                    src="/team-logo-circular-design.jpg"
                    alt="Team XOX Logo"
                    width={400}
                    height={400}
                    className="rounded-full"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.button
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          onClick={() => document.getElementById("skills-section")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll to next section"
        >
          <ChevronDown className="h-10 w-10" />
        </motion.button>
      </section>

      {/* Team Skills Section */}
      <section id="skills-section" className="py-20 bg-muted/20" aria-labelledby="skills-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="skills-heading" className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                Our Expertise
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              We excel in multiple disciplines, bringing diverse skills and perspectives to every project.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamSkills.map((skill, index) => (
              <motion.div key={skill.name} variants={fadeInUp}>
                <SkillBar name={skill.name} percentage={skill.percentage} delay={index * 100} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-20 bg-background" aria-labelledby="values-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="values-heading" className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-accent to-primary text-transparent bg-clip-text">
                Our Core Values
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-primary mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              These principles guide everything we do and define who we are as a team.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.article
                  key={value.title}
                  className="bg-card rounded-xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                  variants={fadeInUp}
                >
                  <div
                    className={`w-16 h-16 rounded-lg bg-${value.color}/20 flex items-center justify-center mb-6 group-hover:bg-${value.color}/30 transition-all`}
                  >
                    <IconComponent className={`h-8 w-8 text-${value.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{value.description}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Members Preview */}
      <section className="py-20 bg-muted/20" aria-labelledby="team-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2
                id="team-heading"
                className="text-4xl md:text-5xl font-extrabold mb-4 text-center md:text-left text-balance"
              >
                <span className="bg-gradient-to-r from-secondary to-accent text-transparent bg-clip-text">
                  Meet Our Team
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-secondary to-accent mx-auto md:mx-0 mb-8" />
              <p className="text-xl text-muted-foreground max-w-xl text-center md:text-left text-pretty">
                Our talented team members bring diverse skills and perspectives to every challenge.
              </p>
            </div>
            <Link href="/members" className="mt-6 md:mt-0">
              <Button
                size="lg"
                className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white font-bold"
              >
                View All Members
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={fadeInUp}>
                <TeamMemberPreview member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 bg-background" aria-labelledby="join-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 border-2 border-primary/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent" />

            <div className="relative z-10 text-center">
              <h2 id="join-heading" className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                  Join Our Team
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
              <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10 text-pretty">
                Are you passionate about innovation and excellence? We're always looking for talented individuals to
                join our team.
              </p>

              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold"
                onClick={() => setIsJoinFormOpen(true)}
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {isJoinFormOpen && (
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <JoinTeamModal isOpen={isJoinFormOpen} onClose={() => setIsJoinFormOpen(false)} />
        </Suspense>
      )}
    </PageWrapper>
  )
}
