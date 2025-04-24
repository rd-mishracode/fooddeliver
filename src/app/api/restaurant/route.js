import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { resturantsSchema } from "@/app/lib/restaurantsdataModel";
export async function GET() {
  await mongoose.connect(connectionStr);
  const res = await resturantsSchema.find();
  console.log(res);
  return NextResponse.json({ result: true, res });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    let result;
    let success = false;
    await mongoose.connect(connectionStr);
    if (payload.login) {
      result = await resturantsSchema.findOne({
        email: payload.email,
        password: payload.password,
      });
      if (result) {
        success = true;
      }
    } else {
      const restaurant = new resturantsSchema(payload);
      result = await restaurant.save();
      if (result) {
        success = true;
      }
    }

    return NextResponse.json({ success, result });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
