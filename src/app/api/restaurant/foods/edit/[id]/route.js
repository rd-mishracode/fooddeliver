import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { foodsSchema } from "@/app/lib/foodModel";

export async function GET(request, content) {
  try {
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr);
    const result = await foodsSchema.findOne({ _id: id });
    if (result) {
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}

export async function PUT(request, content) {
  try {
    const payload = await request.json();
    const id = content.params.id;

    let success = false;
    await mongoose.connect(connectionStr);
    const result = await foodsSchema.findByIdAndUpdate({ _id: id }, payload);
    console.log(result);
    if (result) {
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
