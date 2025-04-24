import { connectionStr } from "@/app/lib/db";
import { diliveryPatnerSchema } from "@/app/lib/diliveryPatnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let success = false;
  let result = new diliveryPatnerSchema(payload);
  result = await result.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ success, result });
}
