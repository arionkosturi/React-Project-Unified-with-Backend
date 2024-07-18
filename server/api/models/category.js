const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
  imgUrl: String,
});

module.exports = mongoose.model("Category", categorySchema);
