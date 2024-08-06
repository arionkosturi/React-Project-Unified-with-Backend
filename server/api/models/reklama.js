const mongoose = require("mongoose");

const reklamaSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    imgUrl: String,
    partner: String,
    targetUrl: String,
    startsAt: Date,
    endsAt: Date,
    isPublished: Boolean,
    paymentStatus: String,
    createdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reklama", reklamaSchema);
