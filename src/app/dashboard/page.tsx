import LargeHeading from '@/frontend/components/ui/LargeHeading'
import Paragraph from '@/frontend/components/ui/Paragraph'
import {getServerSession} from "next-auth";
import {authOptions} from "@/backend/lib/auth";
import {notFound} from "next/navigation";

export default async function Dashboard() {
    const user = await getServerSession(authOptions)
    if (!user) {
        return notFound()
    }

    return (
        <div>
            <div className='container pt-32 max-w-7xl mx-auto'>
                <div className='items-center'>
                    <LargeHeading
                        size='lg'
                        className='three-d text-black dark:text-light-gold'>
                        Sparrow.Express
                    </LargeHeading>
                </div>
                <div>
                    <Paragraph className='max-w-xl'>
                        Search for your favorite delivery service:
                    </Paragraph>
                </div>
            </div>
            <div className={'container'}>
                <LargeHeading
                    size={'sm'}
                    className={'three-d text-black dark:text-light-gold'}>
                    Welcome to the Dashboard
                </LargeHeading>
            </div>
        </div>
    )
}
