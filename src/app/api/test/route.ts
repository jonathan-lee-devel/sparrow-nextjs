import {NextResponse} from 'next/server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {prismaClient} from "@/lib/db";

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const user = await prismaClient.user.findFirst({
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
