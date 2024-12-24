const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "editor", "user"],
    default: "user",
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product collection
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
