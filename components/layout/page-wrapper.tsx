"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { ErrorBoundary } from "@/components/ui/error-boundary"

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <ErrorBoundary>
      <motion.main
        className={`min-h-screen pt-16 ${className}`}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
    </ErrorBoundary>
  )
}
