const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    imgUrl: String,
    content: String,
    category: String,
    sourceUrl: String,
    author: String,
    isPublished: Boolean,
    isHighlighted: Boolean,
    updatedAt: Date,
    createdAt: Date,
    content2: String,
    content3: String,
    img2Url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
