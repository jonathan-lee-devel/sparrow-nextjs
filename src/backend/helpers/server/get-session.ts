import {getServerSession} from 'next-auth';
import {authOptions} from '@/backend/lib/auth';

/**
 * Function used to replace getServerSession(), this allows for local development
 * using tools such as Postman which cannot sign in to Google.
 */
export async function getServerSessionOrLocal() {
  if (process.env.NODE_ENV === 'development') {
    return {
      user: {
        id: '12345',
        email: 'test@example.com',
        name: 'Test-User',
      },
    };
  }
  return await getServerSession(authOptions);
}
