import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { userSchema } from "@/app/lib/userModel";

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr);

  const result = await userSchema.findOne({
    email: payload.email,
    password: payload.password,
  });
  if (result) {
    success = true;
  }

  return NextResponse.json({ success, result });
}
