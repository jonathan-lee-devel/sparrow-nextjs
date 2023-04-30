import {NextResponse} from "next/server";
import {prismaClient} from "@/lib/db";

export async function GET(request: Request, { params }: {
    params: { organizationId: string }
}) {
    const organizationId = params.organizationId;

    const organization = await prismaClient.organization.findUnique({
        where: {
            id: organizationId,
        },
        include: {
            members: {},
            administrators: {},
        }
    })

    return NextResponse.json(organization)
}
