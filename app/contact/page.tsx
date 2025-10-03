"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { fadeInUp, staggerContainer } from "@/lib/types"

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    value: "hello@teamxox.com",
    href: "mailto:hello@teamxox.com",
    color: "primary",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    color: "secondary",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our office location",
    value: "123 Innovation Street, Tech City, TC 12345",
    href: "https://maps.google.com/?q=123+Innovation+Street+Tech+City",
    color: "accent",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "When we're available",
    value: "Mon-Fri: 9AM-6PM EST",
    href: null,
    color: "primary",
  },
]

const PROJECT_TYPES = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "E-commerce Solutions",
  "AI & Machine Learning",
  "Blockchain Development",
  "IoT Solutions",
  "Consulting",
  "Other",
]

const BUDGET_RANGES = ["Under $10K", "$10K - $25K", "$25K - $50K", "$50K - $100K", "$100K+", "Let's discuss"]

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  projectType: string
  budget: string
  timeline: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would send the data to your backend
      console.log("Form submitted:", formData)

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-20" aria-labelledby="contact-heading">
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
            <h1 id="contact-heading" className="text-5xl md:text-6xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                Get In Touch
              </span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />

            <p className="text-xl text-muted-foreground mb-12 text-pretty">
              Ready to start your next project? We'd love to hear from you. Let's discuss how we can bring your vision
              to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-10" aria-labelledby="contact-info-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="contact-info-heading" className="text-3xl md:text-4xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
                Contact Information
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Multiple ways to reach us. Choose what works best for you.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {CONTACT_INFO.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.div key={info.title} variants={fadeInUp}>
                  <Card className="h-full bg-card border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-lg bg-${info.color}/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-${info.color}/30 transition-all`}
                      >
                        <IconComponent className={`h-8 w-8 text-${info.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{info.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
                      {info.href ? (
                        <Link
                          href={info.href}
                          className={`text-${info.color} hover:text-${info.color}/80 font-medium transition-colors`}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {info.value}
                        </Link>
                      ) : (
                        <span className="text-foreground font-medium">{info.value}</span>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-10 pb-20 bg-muted/20" aria-labelledby="contact-form-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 id="contact-form-heading" className="text-3xl md:text-4xl font-extrabold mb-4 text-balance">
                <span className="bg-gradient-to-r from-accent to-secondary text-transparent bg-clip-text">
                  Start Your Project
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-card border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">Project Details</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Please provide as much detail as possible to help us understand your needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitStatus === "success" && (
                    <motion.div
                      className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-green-400 font-medium">Message sent successfully!</p>
                        <p className="text-green-300 text-sm">We'll get back to you within 24 hours.</p>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <div>
                        <p className="text-red-400 font-medium">Failed to send message</p>
                        <p className="text-red-300 text-sm">Please try again or contact us directly.</p>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`bg-background border-2 ${errors.name ? "border-red-500" : "border-border focus:border-primary"}`}
                          placeholder="Your full name"
                          disabled={isSubmitting}
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`bg-background border-2 ${errors.email ? "border-red-500" : "border-border focus:border-primary"}`}
                          placeholder="your.email@example.com"
                          disabled={isSubmitting}
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                          Company Name
                        </label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="bg-background border-2 border-border focus:border-primary"
                          placeholder="Your company name"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-background border-2 border-border focus:border-primary"
                          placeholder="+1 (555) 123-4567"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          value={formData.projectType}
                          onChange={(e) => handleInputChange("projectType", e.target.value)}
                          className="w-full bg-background border-2 border-border focus:border-primary rounded-md px-3 py-2 text-foreground"
                          disabled={isSubmitting}
                        >
                          <option value="">Select project type</option>
                          {PROJECT_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => handleInputChange("budget", e.target.value)}
                          className="w-full bg-background border-2 border-border focus:border-primary rounded-md px-3 py-2 text-foreground"
                          disabled={isSubmitting}
                        >
                          <option value="">Select budget range</option>
                          {BUDGET_RANGES.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-2">
                        Project Timeline
                      </label>
                      <Input
                        id="timeline"
                        type="text"
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        className="bg-background border-2 border-border focus:border-primary"
                        placeholder="e.g., 3 months, ASAP, Flexible"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Project Description *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`bg-background border-2 ${errors.message ? "border-red-500" : "border-border focus:border-primary"} min-h-[120px]`}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        disabled={isSubmitting}
                      />
                      {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
