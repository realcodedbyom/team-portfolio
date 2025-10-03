"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"

interface StatCardProps {
  number: string
  label: string
}

export default function StatCard({ number, label }: StatCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [count, setCount] = useState(0)
  const numberValue = Number.parseInt(number.replace(/\D/g, ""))
  const suffix = number.replace(/[0-9]/g, "")
  const countRef = useRef(0)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (inView) {
      const duration = 2000 // ms
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)

        countRef.current = Math.floor(easeOutQuart * numberValue)
        setCount(countRef.current)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [inView, numberValue])

  return (
    <div
      ref={ref}
      className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 text-center"
    >
      <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
        {inView ? `${count}${suffix}` : "0"}
      </h3>
      <p className="text-gray-400">{label}</p>
    </div>
  )
}
