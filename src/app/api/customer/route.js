import { connectionStr } from "@/app/lib/db";
import { resturantsSchema } from "@/app/lib/restaurantsdataModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  let queryParams = await request.nextUrl.searchParams;
  let filter = {};
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  if (queryParams.get("location")) {
    let city = queryParams.get("location");
    filter = { city: { $regex: new RegExp(city, "i") } };
  } else if (queryParams.get("restaurant")) {
    let restaurantName = queryParams.get("restaurant");
    filter = { restaurantName: { $regex: new RegExp(restaurantName, "i") } };
  }

  let result = await resturantsSchema.find(filter);
  return NextResponse.json({ success: true, result });
}
