const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    role: { type: String, default: "user"},
    createdDate: { type: Date, default: Date.now }
  }
)

const User = mongoose.model("User", userSchema);

module.exports = { User };