import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/orderModel";
import { resturantsSchema } from "@/app/lib/restaurantsdataModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Destructure the payload
    const payload = await request.json();
    const { user_id, foodItemIds, restro_id, diliveryBoy_id, status, amount } =
      payload;

    // Log the payload to verify
    console.log("Payload:", payload);

    // Connect to MongoDB
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a new order object
    const orderObj = new orderSchema({
      user_id,
      foodItemIds,
      restro_id,
      diliveryBoy_id,
      status,
      amount,
    });

    // Log the order object to verify before saving
    console.log("Order Object:", orderObj);

    // Save the order object to the database
    const result = await orderObj.save();
    const success = !!result;

    // Log the result after saving
    console.log("Save Result:", result);

    // Return a response
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function GET(request) {
  let success = false;
  const userId = request.nextUrl.searchParams.get("id");
  let result;
  await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  result = await orderSchema.find({ user_id: userId });
  if (result) {
    let restroData = await Promise.all(
      result.map(async (item) => {
        let restroInfo = {};
        restroInfo.data = await resturantsSchema.findOne({
          _id: item.restro_id,
        });
        (restroInfo.amount = item.amount), (restroInfo.status = item.status);

        return restroInfo;
      })
    );
    result = restroData;
    success = true;
  }

  console.log(result);
  return NextResponse.json({ success, result });
}
