import Navbar from '@/frontend/components/Navbar'
import {Toaster} from '@/frontend/components/ui/toast'
import '@/frontend/styles/globals.css'
import {Inter} from 'next/font/google'

import MobileMenu from '@/frontend/components/MobileMenu'
import Providers from '@/frontend/components/Providers'
import {cn} from '@/frontend/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className='min-h-screen bg-slate-50 dark:bg-slate-900 antialiased'>
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          <Toaster position='bottom-center' />

          <MobileMenu />

          <main>{children}</main>
        </Providers>

        {/* Allow more height for mobile menu on mobile */}
        <div className='h-40 md:hidden' />
      </body>
    </html>
  )
}
