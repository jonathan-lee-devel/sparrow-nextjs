import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'

export default function Dashboard() {
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
        </div>
    )
}
