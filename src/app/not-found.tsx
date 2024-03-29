import Icons from '@/frontend/components/Icons'
import {buttonVariants} from '@/frontend/components/ui/Button'
import LargeHeading from '@/frontend/components/ui/LargeHeading'
import Paragraph from '@/frontend/components/ui/Paragraph'
import Link from 'next/link'
import {FC} from 'react'

import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Sparrow | Page not found',
}

const PageNotFound: FC = () => {
  return (
    <section className='container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center'>
      <LargeHeading>Site not found...</LargeHeading>
      <Paragraph>The site you&apos;re searching for does not exist.</Paragraph>
      <Link
        className={buttonVariants({
          variant: 'ghost',
          className: 'w-fit',
        })}
        href='/'>
        <Icons.ChevronLeft className='mr-2 h-4 w-4' />
        Back to home
      </Link>
    </section>
  )
}

export default PageNotFound
