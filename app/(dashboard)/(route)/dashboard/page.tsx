'use client'

import {
  ArrowRight,
  CodeIcon,
  ImageIcon,
  MessageSquare,
  MusicIcon,
  VideoIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const aiTools = [
  {
    label: 'Conversations',
    icon: MessageSquare,
    href: '/conversations',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    label: 'Music Generation',
    icon: MusicIcon,
    href: '/music',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    href: '/code',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
]

const Dashboard = () => {
  const router = useRouter()
  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Uncover the potential of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Connect with the smartest AI - Explore the transformative power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 mt-8">
        {aiTools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.label}
            className="p-4 border-black/10 flex items-center justify-between  hover:shadow-md cursor pointer transition"
          >
            <div className="flex items-center space-x-4">
              <div className={cn('rounded-full p-2', tool.bgColor)}>
                <tool.icon className={cn('w-6 h-6', tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight />
          </Card>
        ))}
      </div>
    </div>
  )
}
export default Dashboard
