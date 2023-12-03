import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const UserAvatar = () => {
  const { user } = useUser()
  return (
    <Avatar className="w-10 h-10">
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback delayMs={600}>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
