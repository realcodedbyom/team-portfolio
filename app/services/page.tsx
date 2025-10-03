"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  Code,
  Smartphone,
  Palette,
  ShoppingCart,
  Brain,
  Shield,
  Wifi,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Target,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { fadeInUp, staggerContainer } from "@/lib/types"

const SERVICES = [
  {
    id: "web-development",
    icon: Code,
    title: "Web Development",
    shortDescription: "Custom web applications built with modern technologies",
    description:
      "We create scalable, performant web applications using cutting-edge technologies like React, Next.js, and Node.js. Our solutions are designed to grow with your business.",
    features: [
      "Responsive Design",
      "Progressive Web Apps",
      "API Development",
      "Database Design",
      "Performance Optimization",
      "SEO Optimization",
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB"],
    startingPrice: "$5,000",
    timeline: "4-12 weeks",
    color: "primary",
  },
  {
    id: "mobile-development",
    icon: Smartphone,
    title: "Mobile Development",
    shortDescription: "Native and cross-platform mobile applications",
    description:
      "From iOS and Android native apps to cross-platform solutions using React Native, we deliver mobile experiences that users love.",
    features: [
      "iOS & Android Apps",
      "Cross-platform Development",
      "App Store Optimization",
      "Push Notifications",
      "Offline Functionality",
      "App Analytics",
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Flutter", "Firebase", "Expo"],
    startingPrice: "$8,000",
    timeline: "6-16 weeks",
    color: "secondary",
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    shortDescription: "User-centered design that drives engagement",
    description:
      "Our design team creates intuitive, beautiful interfaces that enhance user experience and drive business results through research-backed design decisions.",
    features: [
      "User Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "Design Systems",
      "Usability Testing",
      "Brand Identity",
    ],
    technologies: ["Figma", "Adobe Creative Suite", "Sketch", "InVision", "Principle", "Framer"],
    startingPrice: "$3,000",
    timeline: "3-8 weeks",
    color: "accent",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    shortDescription: "Complete online stores that drive sales",
    description:
      "We build comprehensive e-commerce platforms with payment processing, inventory management, and analytics to help you sell online effectively.",
    features: [
      "Custom Shopping Cart",
      "Payment Integration",
      "Inventory Management",
      "Order Processing",
      "Analytics Dashboard",
      "Multi-vendor Support",
    ],
    technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal", "Magento", "BigCommerce"],
    startingPrice: "$7,000",
    timeline: "6-14 weeks",
    color: "primary",
  },
  {
    id: "ai-ml",
    icon: Brain,
    title: "AI & Machine Learning",
    shortDescription: "Intelligent solutions powered by AI",
    description:
      "Leverage the power of artificial intelligence and machine learning to automate processes, gain insights, and create intelligent applications.",
    features: [
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision",
      "Recommendation Systems",
      "Chatbots & Virtual Assistants",
      "Data Analysis",
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "Scikit-learn"],
    startingPrice: "$10,000",
    timeline: "8-20 weeks",
    color: "secondary",
  },
  {
    id: "blockchain",
    icon: Shield,
    title: "Blockchain Development",
    shortDescription: "Secure, decentralized applications",
    description:
      "Build secure, transparent, and decentralized applications using blockchain technology for various use cases including DeFi, NFTs, and smart contracts.",
    features: [
      "Smart Contracts",
      "DeFi Applications",
      "NFT Marketplaces",
      "Cryptocurrency Wallets",
      "Blockchain Integration",
      "Security Audits",
    ],
    technologies: ["Solidity", "Web3.js", "Ethereum", "Polygon", "Hardhat", "IPFS"],
    startingPrice: "$12,000",
    timeline: "10-24 weeks",
    color: "accent",
  },
  {
    id: "iot",
    icon: Wifi,
    title: "IoT Solutions",
    shortDescription: "Connected devices and smart systems",
    description:
      "Create intelligent IoT ecosystems that connect devices, collect data, and provide actionable insights for smart homes, cities, and industries.",
    features: [
      "Device Connectivity",
      "Data Collection & Analysis",
      "Real-time Monitoring",
      "Automated Controls",
      "Cloud Integration",
      "Mobile Dashboards",
    ],
    technologies: ["Arduino", "Raspberry Pi", "MQTT", "InfluxDB", "AWS IoT", "Azure IoT"],
    startingPrice: "$9,000",
    timeline: "8-18 weeks",
    color: "primary",
  },
  {
    id: "consulting",
    icon: MessageSquare,
    title: "Technical Consulting",
    shortDescription: "Expert guidance for your tech strategy",
    description:
      "Get expert advice on technology choices, architecture decisions, and digital transformation strategies to ensure your projects succeed.",
    features: [
      "Technology Assessment",
      "Architecture Planning",
      "Code Reviews",
      "Performance Audits",
      "Team Training",
      "Digital Strategy",
    ],
    technologies: ["Various", "Best Practices", "Industry Standards", "Methodologies"],
    startingPrice: "$150/hour",
    timeline: "Flexible",
    color: "secondary",
  },
]

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Planning",
    description:
      "We start by understanding your business goals, target audience, and technical requirements to create a comprehensive project plan.",
    icon: Target,
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description:
      "Our design team creates wireframes, mockups, and interactive prototypes to visualize the final product before development begins.",
    icon: Palette,
  },
  {
    step: "03",
    title: "Development & Testing",
    description:
      "We build your solution using agile methodologies, with regular testing and quality assurance throughout the development process.",
    icon: Code,
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "We deploy your solution and provide ongoing support, maintenance, and optimization to ensure continued success.",
    icon: Zap,
  },
]

const WHY_CHOOSE_US = [
  {
    title: "Expert Team",
    description: "Our diverse team brings years of experience across multiple technologies and industries.",
    icon: Users,
  },
  {
    title: "Proven Process",
    description:
      "We follow industry best practices and agile methodologies to deliver projects on time and within budget.",
    icon: CheckCircle,
  },
  {
    title: "Quality Focus",
    description: "We prioritize code quality, performance, and security in every project we deliver.",
    icon: Shield,
  },
  {
    title: "Ongoing Support",
    description:
      "We provide comprehensive support and maintenance to ensure your solution continues to perform optimally.",
    icon: Clock,
  },
]

export default function ServicesPage() {
  const [activeService, setActiveService] = useState("web-development")

  const selectedService = SERVICES.find((service) => service.id === activeService)

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-20" aria-labelledby="services-heading">
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
            <h1 id="services-heading" className="text-5xl md:text-6xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                Our Services
              </span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-6" />

            <p className="text-xl text-muted-foreground mb-12 text-pretty">
              From web development to AI solutions, we offer comprehensive digital services to help your business thrive
              in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-10" aria-labelledby="services-overview-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="services-overview-heading" className="text-3xl md:text-4xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
                What We Do
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {SERVICES.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div key={service.id} variants={fadeInUp}>
                  <Card className="h-full bg-card border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-lg bg-${service.color}/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-${service.color}/30 transition-all`}
                      >
                        <IconComponent className={`h-8 w-8 text-${service.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{service.shortDescription}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>From {service.startingPrice}</span>
                        <span>{service.timeline}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-10 bg-muted/20" aria-labelledby="detailed-services-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="detailed-services-heading" className="text-3xl md:text-4xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-accent to-secondary text-transparent bg-clip-text">
                Service Details
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore our services in detail to find the perfect solution for your needs
            </p>
          </motion.div>

          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs value={activeService} onValueChange={setActiveService}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8 h-auto p-1">
                {SERVICES.map((service) => {
                  const IconComponent = service.icon
                  return (
                    <TabsTrigger
                      key={service.id}
                      value={service.id}
                      className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="text-xs hidden sm:block">{service.title.split(" ")[0]}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {SERVICES.map((service) => {
                const IconComponent = service.icon
                return (
                  <TabsContent key={service.id} value={service.id}>
                    <Card className="bg-card border-2 border-primary/20">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`w-16 h-16 rounded-lg bg-${service.color}/20 flex items-center justify-center`}
                          >
                            <IconComponent className={`h-8 w-8 text-${service.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-bold text-foreground">{service.title}</CardTitle>
                            <CardDescription className="text-lg">{service.shortDescription}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          <div className="lg:col-span-2">
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">{service.description}</p>

                            <h3 className="text-xl font-semibold text-foreground mb-4">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                              {service.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                                  <span className="text-muted-foreground">{feature}</span>
                                </div>
                              ))}
                            </div>

                            <h3 className="text-xl font-semibold text-foreground mb-4">Technologies We Use</h3>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-sm">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-6">
                            <Card className="bg-muted/20 border border-primary/20">
                              <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-4">Project Details</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Starting Price:</span>
                                    <span className="font-semibold text-foreground">{service.startingPrice}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Timeline:</span>
                                    <span className="font-semibold text-foreground">{service.timeline}</span>
                                  </div>
                                </div>
                                <Link href="/contact" className="block mt-6">
                                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white">
                                    Get Quote
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </Button>
                                </Link>
                              </CardContent>
                            </Card>

                            <Card className="bg-muted/20 border border-secondary/20">
                              <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-4">Need Help Choosing?</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                  Not sure which service is right for you? Let's discuss your project requirements.
                                </p>
                                <Link href="/contact">
                                  <Button
                                    variant="outline"
                                    className="w-full border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                                  >
                                    Schedule Consultation
                                  </Button>
                                </Link>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )
              })}
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-background" aria-labelledby="process-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="process-heading" className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                Our Process
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              A proven methodology that ensures successful project delivery every time
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-12">
              {PROCESS_STEPS.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div key={step.step} className="flex items-start gap-8" variants={fadeInUp}>
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                        <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/20" aria-labelledby="why-choose-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="why-choose-heading" className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-secondary to-accent text-transparent bg-clip-text">
                Why Choose Team XOX
              </span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-secondary to-accent mx-auto mb-8" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              What sets us apart from other development teams
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {WHY_CHOOSE_US.map((reason, index) => {
              const IconComponent = reason.icon
              return (
                <motion.div key={reason.title} variants={fadeInUp}>
                  <Card className="h-full bg-card border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-all">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
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
                  Ready to Start Your Project?
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
                Let's discuss your project requirements and create something amazing together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
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
