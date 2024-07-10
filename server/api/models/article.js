const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    imgUrl: String,
    img2Url: String,
    content: String,
    content2: String,
    content3: String,
    category: String,
    sourceUrl: String,
    author: String,
    isPublished: Boolean,
    updatedAt: Date,
    createdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
