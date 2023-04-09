import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sparrow',
  description: 'Delivery service application',
}

export default function Home() {
  return (
    <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pt-32 max-w-7xl w-full mx-auto h-full'>
        <div className='h-full gap-6 flex flex-collg:justify-center items-center'>
          <LargeHeading
            size='lg'
            className='three-d text-black dark:text-light-gold'>
            Sparrow.Express
          </LargeHeading>

          <Paragraph className='max-w-xl'>
            Search for your favorite delivery service:
          </Paragraph>

          <div>
            <form>
              <i className="fa fa-search" aria-hidden="true"></i><input type="text" name="search"
                                                                        placeholder="Search.." />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
