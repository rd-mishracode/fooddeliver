const { default: mongoose } = require("mongoose");

const diliverPatnerModel = new mongoose.Schema({
  name: String,
  password: String,
  address: String,
  city: String,
  mobile: String,
});
export const diliveryPatnerSchema =
  mongoose.models.diliveryboys ||
  mongoose.model("diliveryboys", diliverPatnerModel);
