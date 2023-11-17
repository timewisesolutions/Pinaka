'use client'
import React from 'react'
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
const poppins = Montserrat({ weight: '600', subsets: ['latin'] })

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Conversations',
    icon: MessageSquare,
    href: '/conversations',
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-500',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: 'text-yellow-500',
  },
  {
    label: 'Music Generation',
    icon: MusicIcon,
    href: '/music',
    color: 'text-orange-500',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-emerald-500',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]
const Sidebar = () => {
  return (
    <div className="py-4 flex flex-col h-full text-white bg-gray-800">
      <div className="px-4 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 space-x-2">
          <div className="h-4 w-4">
            <Image
              alt="Logo"
              src="/logo.png"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className={cn('text-xl font-bold', poppins.className)}>
            Pinaka
          </div>
        </Link>

        <div className="my-6 justify-between">
          {routes.map((route) => (
            <Link href={route.href} key={route.href}>
              <div className="flex items-center pl-3 py-2 hover:text-white hover:bg-white/10 cursor-pointer rounded text-sm font-medium transition">
                <route.icon
                  className={cn('w-4 h-4 mr-2', route.color)}
                ></route.icon>
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
