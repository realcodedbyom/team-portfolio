"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Target, Users, Lightbulb, Award, TrendingUp, Globe, Heart, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { fadeInUp, staggerContainer } from "@/lib/types"

const COMPANY_STATS = [
  { label: "Years of Experience", value: "8+", icon: Award },
  { label: "Projects Completed", value: "150+", icon: Target },
  { label: "Happy Clients", value: "100+", icon: Heart },
  { label: "Team Members", value: "12+", icon: Users },
  { label: "Countries Served", value: "25+", icon: Globe },
  { label: "Growth Rate", value: "200%", icon: TrendingUp },
]

const CORE_VALUES = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We constantly explore new technologies and methodologies to stay ahead of the curve and deliver cutting-edge solutions.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Our diverse team brings together unique perspectives and skills, fostering creativity and excellence in every project.",
    color: "secondary",
  },
  {
    icon: Target,
    title: "Client Success",
    description:
      "We measure our success by the success of our clients, ensuring every project delivers measurable value and impact.",
    color: "accent",
  },
  {
    icon: Zap,
    title: "Agile Excellence",
    description:
      "We embrace agile methodologies to deliver high-quality solutions quickly and adapt to changing requirements.",
    color: "primary",
  },
]

const TIMELINE_EVENTS = [
  {
    year: "2016",
    title: "Company Founded",
    description:
      "Started as a small team of passionate developers and designers with a vision to create exceptional digital experiences.",
  },
  {
    year: "2018",
    title: "First Major Client",
    description:
      "Secured our first enterprise client and delivered a comprehensive e-commerce platform that increased their sales by 300%.",
  },
  {
    year: "2020",
    title: "Team Expansion",
    description:
      "Grew our team to 8 members and expanded our services to include AI/ML solutions and mobile app development.",
  },
  {
    year: "2022",
    title: "International Recognition",
    description: "Won the 'Best Digital Agency' award and started serving clients across 25+ countries worldwide.",
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description:
      "Established our innovation lab focusing on emerging technologies like blockchain, IoT, and advanced AI solutions.",
  },
]

export default function AboutPage() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0)

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-20" aria-labelledby="about-heading">
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
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 id="about-heading" className="text-5xl md:text-6xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                About Team XOX
              </span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-6" />

            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              We are a passionate team of innovators, creators, and problem-solvers dedicated to pushing the boundaries
              of what's possible in the digital realm.
            </p>

            <motion.div
              className="bg-card rounded-2xl p-8 border-2 border-primary/20 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                To empower businesses and individuals with innovative digital solutions that drive growth, enhance user
                experiences, and create lasting impact in an ever-evolving technological landscape.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-muted/20" aria-labelledby="stats-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="stats-heading" className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-accent to-primary text-transparent bg-clip-text">Our Impact</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-primary mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Numbers that reflect our commitment to excellence and the trust our clients place in us.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {COMPANY_STATS.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <Card className="text-center bg-card border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-all">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
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
              <span className="bg-gradient-to-r from-secondary to-accent text-transparent bg-clip-text">
                Our Core Values
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-secondary to-accent mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              The principles that guide our work and define who we are as a team.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {CORE_VALUES.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div key={value.title} variants={fadeInUp}>
                  <Card className="h-full bg-card border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 rounded-lg bg-${value.color}/20 flex items-center justify-center mb-4 group-hover:bg-${value.color}/30 transition-all`}
                      >
                        <IconComponent className={`h-8 w-8 text-${value.color}`} />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-muted/20" aria-labelledby="timeline-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="timeline-heading" className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                Our Journey
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              From humble beginnings to industry recognition - here's how we've grown over the years.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary hidden md:block" />

              <div className="space-y-12">
                {TIMELINE_EVENTS.map((event, index) => (
                  <motion.div
                    key={event.year}
                    className="relative flex items-start gap-8"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onViewportEnter={() => setActiveTimelineIndex(index)}
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 hidden md:block">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
                          activeTimelineIndex === index
                            ? "bg-gradient-to-r from-primary to-secondary scale-110"
                            : "bg-muted-foreground"
                        }`}
                      >
                        {event.year}
                      </div>
                    </div>

                    {/* Content */}
                    <Card
                      className={`flex-1 bg-card border-2 transition-all duration-300 ${
                        activeTimelineIndex === index ? "border-primary/40 shadow-lg" : "border-primary/20"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-4 md:hidden">
                          <Badge className="bg-primary text-white">{event.year}</Badge>
                        </div>
                        <CardTitle className="text-2xl font-bold text-foreground">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                          {event.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 border-2 border-primary/20 relative overflow-hidden text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent" />

            <div className="relative z-10">
              <h2 id="cta-heading" className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                  Ready to Work Together?
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
                Let's discuss how we can help bring your vision to life with our expertise and passion for innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold"
                  >
                    Get In Touch
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-secondary text-secondary hover:bg-secondary/10 font-bold bg-transparent"
                  >
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
