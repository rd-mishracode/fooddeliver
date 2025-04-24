const { default: mongoose } = require("mongoose");

const resturantsdataModel = new mongoose.Schema({
  email: String,
  password: String,
  address: String,
  city: String,
  restaurantName: String,
  contact: String,
});

export const resturantsSchema =
  mongoose.models.restaurantData ||
  mongoose.model("restaurantData", resturantsdataModel);
