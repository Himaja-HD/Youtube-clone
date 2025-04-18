const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: String,
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }]
});

module.exports = mongoose.model("User", UserSchema);
