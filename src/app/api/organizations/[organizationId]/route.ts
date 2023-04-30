import {NextResponse} from "next/server";
import {getOrganization} from "../../../../backend/services/organizations/use-cases";
import {getServerSessionOrLocal} from "@/backend/helpers/server/get-session";
import {returnUnauthorized} from "@/backend/helpers/server/return-status";

export async function GET(request: Request, { params }: {
    params: { organizationId: string }
}) {
    const session = await getServerSessionOrLocal()
    if (!session || !session.user.email) {
        return returnUnauthorized()
    }

    const organizationContainer = await getOrganization(session.user.email, params.organizationId);

    return NextResponse.json(organizationContainer.data)
}
