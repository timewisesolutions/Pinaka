import Image from 'next/image'

interface EmptyProps {
  label: string
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="p-20 flex flex-col items-center justify-center">
      <Image src="/empty.png" alt="Empty" width={200} height={200} />
      <p className="text-muted-foreground text-md text-center">{label}</p>
    </div>
  )
}
