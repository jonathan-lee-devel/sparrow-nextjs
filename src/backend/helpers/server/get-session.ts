import {getServerSession} from 'next-auth';
import {authOptions} from '@/backend/lib/auth';

export async function getServerSessionOrLocal() {
    if (process.env.NODE_ENV === 'development') {
        return {
            user: {
                email: 'test@example.com'
            }
        }
    }
    return await getServerSession(authOptions)
}
