import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  let result;

  await mongoose.connect(connectionStr);

  const food = new foodsSchema(payload);
  result = await food.save();

  return NextResponse.json({ success: true, result });
}
