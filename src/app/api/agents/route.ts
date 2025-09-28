// src/app/api/agents/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET all agents for the authenticated user
export async function GET() {
  try {
    const { userId } = await auth(); // ✅ Await auth() in App Router
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user with agents
    const userWithAgents = await prisma.user.findUnique({
      where: { id: userId },
      include: { agents: true },
    });

    return NextResponse.json(userWithAgents?.agents || []);
  } catch (error) {
    console.error("GET /api/agents error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST a new agent
export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // ✅ Await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Optional: Validate body
    if (!body.name || !body.code) {
      return NextResponse.json({ error: "Name and code are required" }, { status: 400 });
    }

    const newAgent = await prisma.agent.create({
      data: {
        name: body.name,
        code: body.code,
        ownerId: userId,
      },
    });

    return NextResponse.json(newAgent);
  } catch (error) {
    console.error("POST /api/agents error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
