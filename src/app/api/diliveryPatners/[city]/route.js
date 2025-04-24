import { connectionStr } from "@/app/lib/db";
import { diliveryPatnerSchema } from "@/app/lib/diliveryPatnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  let city = content.params.city;
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let filter = { city: { $regex: new RegExp(city, "i") } };
  const result = await diliveryPatnerSchema.find(filter);
  if (result) {
    success = true;
  }
  return NextResponse.json({ success, result });
}
