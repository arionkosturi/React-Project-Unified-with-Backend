const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      unique: [true, "Username already used."],
      required: true,
    },
    password: {
      type: String,
      min: [5, "Too few chars"],
      max: [30, "Too many chars"],
      required: true,
    },
    email: String,
    imgUrl: String,
    isAdmin: Boolean,
    likedArticles: {
      type: Array,
    },
    isLoggedIn: Boolean,
    createdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
