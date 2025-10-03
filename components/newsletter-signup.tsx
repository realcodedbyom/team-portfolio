"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail, CheckCircle } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubscribed(true)
    setEmail("")

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Stay Updated</h3>
          <p className="text-muted-foreground">Get the latest updates on our projects and team news</p>
        </div>

        {isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
            <p className="text-green-600 font-semibold">Thanks for subscribing!</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background border-border focus:border-primary"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
