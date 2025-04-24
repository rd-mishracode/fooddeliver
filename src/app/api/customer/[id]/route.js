import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodModel";
import { resturantsSchema } from "@/app/lib/restaurantsdataModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const id = content.params.id;
  await mongoose.connect(connectionStr);
  const detail = await resturantsSchema.findOne({ _id: id });
  const foodItem = await foodsSchema.find({ restro_id: id });
  return NextResponse.json({ success: true, detail, foodItem });
}
