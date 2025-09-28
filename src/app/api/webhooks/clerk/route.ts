// src/app/api/webhooks/clerk/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { data } = await req.json();

  await prisma.user.upsert({
    where: { id: data.id },
    update: { email: data.email_addresses[0].email_address },
    create: {
      id: data.id,
      email: data.email_addresses[0].email_address,
    },
  });

  return NextResponse.json({ success: true });
}
