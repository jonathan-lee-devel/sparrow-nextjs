'use client'

import {cn} from '@/frontend/lib/utils'
import {useRouter} from 'next/navigation'
import {ButtonHTMLAttributes, FC} from 'react'
import Icons from '@/frontend/components/Icons'
import {Button} from '@/frontend/components/ui/Button'

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const BackButton: FC<BackButtonProps> = ({ className, ...props }) => {
  const router = useRouter()
  return (
    <Button
      variant='ghost'
      {...props}
      onClick={() => router.back()}
      className={cn('w-fit', className)}>
      <>
        <Icons.ChevronLeft className='mr-2 h-4 w-4' />
        Back
      </>
    </Button>
  )
}

export default BackButton
