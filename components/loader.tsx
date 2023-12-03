import Image from 'next/image'

export const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900">
        <Image src="/logo.png" alt="logo" width={10} height={10} />
      </div>
      <p className="text-muted-foreground text-sm">Pinaka is thinking...</p>
    </div>
  )
}
