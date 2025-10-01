import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface Props {
  data: string
  className?: string
}

export const Copy = ({ data, className }: Props) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(data)
    toast.success('Copied')
  }

  return (
    <p className={cn('text-[8px] cursor-pointer text-left leading-[10px] break-all', className)} onClick={handleCopy}>
      {data}
    </p>
  )
}
