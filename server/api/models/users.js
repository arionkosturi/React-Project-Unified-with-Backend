const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    isAdmin: Boolean,
    isLoggedIn: Boolean,
    createdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
