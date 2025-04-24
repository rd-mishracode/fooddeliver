import { connectionStr } from "@/app/lib/db";
import { resturantsSchema } from "@/app/lib/restaurantsdataModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let result = await resturantsSchema.find();
  result = result.map(
    (item) => item.city.charAt(0).toUpperCase() + item.city.slice(1)
  );

  result = [...new Set(result.map((item) => item))];

  return NextResponse.json({ success: true, result });
}
