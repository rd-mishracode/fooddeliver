import { connectionStr } from "@/app/lib/db";
import { diliveryPatnerSchema } from "@/app/lib/diliveryPatnerModel";
import { orderSchema } from "@/app/lib/orderModel";
import { resturantsSchema } from "@/app/lib/restaurantsdataModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const id = content.params.id;
  let success = false;
  await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let result = await orderSchema.find({ diliveryBoy_id: id });
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
  return NextResponse.json({ success, result });
}

// export async function PUT(request, { params }) {
//   const orderId = params.id;
//   const { status } = await request.json();

//   try {
//     await mongoose.connect(connectionStr);

//     // Find the order by ID
//     let result = await orderSchema.find({ _id: orderId });
//     if (result.length > 0) {
//       // Access the first object in the array
//       let order = result[0];
//       // Update the status
//       order.status = status;
//       // Save the updated order
//       await order.save();

//       return NextResponse.json({ success: true, result: order });
//     } else {
//       return NextResponse.json(
//         { success: false, message: "Order not found" },
//         { status: 404 }
//       );
//     }
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     );
//   } finally {
//     // Close the mongoose connection
//     mongoose.connection.close();
//   }
// }

export async function PUT(request, { params }) {
  const { id: deliveryId } = params;
  const { status } = await request.json();
  await mongoose.connect(connectionStr);
  const deliveryPartner = await diliveryPatnerSchema.findById(deliveryId);
  if (!deliveryPartner) {
    return NextResponse.json(
      { success: false, message: "Delivery partner not found" },
      { status: 404 }
    );
  }
  const updatedOrders = await orderSchema.updateMany(
    { deliveryPartnerId: deliveryPartner._id },
    { $set: { status: status } }, // Ensure only the status field is updated
    { new: true }
  );

  return NextResponse.json({ success: true, result: updatedOrders });
}
