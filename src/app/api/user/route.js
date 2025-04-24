import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    let success = false;
    let message;

    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const userEmailAlreadyRegister = await userSchema.findOne({
      email: payload.email,
    });
    if (userEmailAlreadyRegister) {
      success = false;
      message = "User already registered";
      return NextResponse.json({ success, message });
    } else {
      const user = new userSchema(payload);
      const result = await user.save();
      if (result) {
        success = true;
        message = "User registered successfully";
      }

      return NextResponse.json({ success, message, result });
    }
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
