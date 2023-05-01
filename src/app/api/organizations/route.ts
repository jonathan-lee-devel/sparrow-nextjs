import {createOrganization} from '@/backend/services/organizations/use-cases';
import {getServerSessionOrLocal} from '@/backend/helpers/server/get-session';
import {returnUnauthorized} from '@/backend/helpers/server/return-status';
import {NextResponse} from 'next/server';

/**
 * Create organization route.
 * @param {Request} request incoming request
 * @constructor
 */
export async function POST(request: Request) {
  const session = await getServerSessionOrLocal();
  if (!session) {
    return returnUnauthorized();
  }
  const requestBody = await request.json() as any;

  const organizationContainer = await createOrganization(session.user, requestBody.name);

  return NextResponse.json(organizationContainer.data, {status: organizationContainer.status});
}
