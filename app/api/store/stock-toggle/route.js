import { prisma } from "@/lib/db";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json(
        { error: "Missing product id" },
        { status: 400 },
      );
    }

    const storeId = await authSeller(userId);
    if (!storeId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    // Check if product exists
    const product = await prisma.product.findFirst({
      where: { id: productId, storeId },
    });

    if (!product) {
      return NextResponse.json({ error: "No product found" }, { status: 404 });
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        inStock: !product.inStock,
      },
    });

    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 },
    );
  }
}
