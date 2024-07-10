const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
_id: mongoose.Types.ObjectId,
name: String,
imgUrl: String,
});

module.exports = mongoose.model('Category', categorySchema);