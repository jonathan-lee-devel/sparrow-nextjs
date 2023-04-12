import {NextResponse} from 'next/server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    return NextResponse.json({ 'hello': session.user.email })
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new Response('Unauthorized', { status: 401 })
    }

    const res = await request.json()
    return NextResponse.json(res)
}
