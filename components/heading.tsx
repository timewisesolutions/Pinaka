import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface headingProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  bgColor?: string
}
const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: headingProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center">
      <div className={cn('rounded-full p-2', bgColor)}>
        <Icon className={cn('w-10 h-10', iconColor)} />
      </div>
      <div className="ml-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground font-light text-sm">
          {description}
        </p>
      </div>
    </div>
  )
}

export default Heading
