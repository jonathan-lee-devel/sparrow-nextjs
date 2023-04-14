import {NextResponse} from 'next/server';
import {prismaClient} from "@/lib/db";
import {Organization} from ".prisma/client";

export async function POST(request: Request) {
    const requestBody = await request.json() as Organization

    const result = await prismaClient.organization.create({
        data: {
            name: requestBody.name,
            administrators: {
                connect: {
                    email: 'jonathan.lee.devel@gmail.com',
                },
            },
        }
    })

    return NextResponse.json({ 'organization': requestBody, 'result': result })
}
