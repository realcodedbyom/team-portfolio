import Image from "next/image"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  position: string
  quote: string
  avatar: string
}

export default function TestimonialCard({ name, position, quote, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-purple-900/20">
      <div className="mb-6 text-purple-400">
        <Quote className="h-8 w-8 opacity-50" />
      </div>

      <p className="text-gray-300 mb-6 italic">"{quote}"</p>

      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-700">
          <Image src={avatar || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>

        <div>
          <h4 className="font-medium text-white">{name}</h4>
          <p className="text-sm text-gray-400">{position}</p>
        </div>
      </div>
    </div>
  )
}
