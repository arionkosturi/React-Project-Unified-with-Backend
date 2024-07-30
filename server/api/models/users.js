const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      unique: [true, "Username already used."],
    },
    password: String,
    email: String,
    imgUrl: String,
    isAdmin: Boolean,
    isLoggedIn: Boolean,
    createdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
