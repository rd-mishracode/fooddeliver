const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
  email: String,
  password: String,
  address: String,
  city: String,
  name: String,
  contact: String,
});
export const userSchema =
  mongoose.models.users || mongoose.model("users", userModel);
