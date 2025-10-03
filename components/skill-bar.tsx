"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface SkillBarProps {
  name: string
  percentage: number
  compact?: boolean
  delay?: number
}

export default function SkillBar({ name, percentage, compact = false, delay = 0 }: SkillBarProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [animatedWidth, setAnimatedWidth] = useState(0)

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setAnimatedWidth(percentage)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isIntersecting, percentage, delay])

  const getGradientClasses = () => {
    if (percentage >= 90) return "from-primary to-accent"
    if (percentage >= 80) return "from-accent to-secondary"
    return "from-secondary to-primary"
  }

  const skillLevel =
    percentage >= 90 ? "Expert" : percentage >= 80 ? "Advanced" : percentage >= 60 ? "Intermediate" : "Beginner"

  return (
    <div
      ref={ref}
      className="w-full"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${name} skill level: ${skillLevel}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`font-medium ${compact ? "text-sm" : "text-base"} text-foreground`}>{name}</span>
        <span className={`${compact ? "text-sm" : "text-base"} text-muted-foreground font-mono`}>{percentage}%</span>
      </div>

      <div
        className={`w-full ${compact ? "h-2" : "h-3"} bg-background rounded-full overflow-hidden border border-border`}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getGradientClasses()} relative`}
          initial={{ width: 0 }}
          animate={{ width: `${animatedWidth}%` }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: delay / 1000,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  )
}
