import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { diliveryPatnerSchema } from "@/app/lib/diliveryPatnerModel";

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr);

  const result = await diliveryPatnerSchema.findOne({
    mobile: payload.mobile,
    password: payload.password,
  });
  if (result) {
    success = true;
  }

  return NextResponse.json({ success, result });
}
