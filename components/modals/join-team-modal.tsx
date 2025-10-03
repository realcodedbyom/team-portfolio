"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"
import type { ContactForm } from "@/lib/types"

interface JoinTeamModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function JoinTeamModal({ isOpen, onClose }: JoinTeamModalProps) {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    skills: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    onClose()
    // Reset form
    setFormData({ name: "", email: "", skills: "", message: "" })
  }

  const handleInputChange =
    (field: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={formRef}
            className="bg-card rounded-xl p-6 md:p-8 border-2 border-primary/20 max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                id="modal-title"
                className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
              >
                Join Our Team
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  className="bg-background border-border text-foreground focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className="bg-background border-border text-foreground focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="skills" className="sr-only">
                  Your Skills
                </label>
                <Input
                  id="skills"
                  type="text"
                  placeholder="Your Skills (e.g., React, Design, Marketing)"
                  value={formData.skills}
                  onChange={handleInputChange("skills")}
                  className="bg-background border-border text-foreground focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Tell us about yourself
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about yourself and why you want to join our team"
                  value={formData.message}
                  onChange={handleInputChange("message")}
                  className="bg-background border-border text-foreground resize-none h-32 focus:border-primary"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      Submit Application
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
