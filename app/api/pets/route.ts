// app/api/pets/route.ts
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const pets = await prisma.pet.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(pets);
}

export async function POST(req: Request) {
  try {
    const { species, name, role, comment, emoji } = await req.json();
    if (!species || !name || !role || !comment) {
      return NextResponse.json({ error: "必須項目が不足" }, { status: 400 });
    }
    const pet = await prisma.pet.create({
      data: { species, name, role, comment, emoji },
    });
    return NextResponse.json(pet);
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
