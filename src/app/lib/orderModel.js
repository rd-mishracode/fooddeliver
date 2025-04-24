const { default: mongoose } = require("mongoose");

const orderModel = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  foodItemIds: String,
  restro_id: mongoose.Schema.Types.ObjectId,
  diliveryBoy_id: mongoose.Schema.Types.ObjectId,
  status: String,
  status: {
    type: String,
    enum: ["confirm", "Dispatched", "Delivered", "Cancelled"],
    default: "confirm",
  },
  amount: String,
});

export const orderSchema =
  mongoose.models.orders || mongoose.model("orders", orderModel);
