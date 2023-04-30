import {NextResponse} from 'next/server';
import {prismaClient} from "@/lib/db";
import {getServerSessionOrLocal} from "@/helpers/server/get-session";
import {returnUnauthorized} from "@/helpers/server/return-status";

export async function GET() {
    const session = await getServerSessionOrLocal()
    if (!session) {
        return returnUnauthorized()
    }

    if (!session.user.email) {
        return returnUnauthorized()
    }

    const user = await prismaClient.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!user) {
        return NextResponse.json({'error': 'Could not find user'})
    }

    return NextResponse.json({ 'hello': user.name })
}

export async function POST(request: Request) {
    const response = await request.json()

    return NextResponse.json(response)
}
