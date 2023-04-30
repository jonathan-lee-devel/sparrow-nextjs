import {NextResponse} from 'next/server';
import {getServerSessionOrLocal} from '@/backend/helpers/server/get-session';
import {returnUnauthorized} from '@/backend/helpers/server/return-status';
import {getOrganizationById} from '@/backend/services/organizations/use-cases';

export async function GET(request: Request, {params}: {
    params: { organizationId: string }
}) {
  const session = await getServerSessionOrLocal();
  if (!session || !session.user) {
    return returnUnauthorized();
  }

  const organizationContainer = await getOrganizationById(session.user, params.organizationId);

  return NextResponse.json(organizationContainer.data);
}
