import { prisma } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Update cart
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address } = await request.json();

    address.userId = userId;
    const newAddress = await prisma.address.create({
      data: address,
    });
    return NextResponse.json({ newAddress, message: "Address added" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong." },
      { status: 400 },
    );
  }
}

// Get all addresses for user
export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const addresses = await prisma.address.findMany({
      where: { userId },
    });
    return NextResponse.json({ addresses });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong." },
      { status: 400 },
    );
  }
}
