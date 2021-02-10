const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  codeStatus: {
    type: Boolean,
    require: true,
  },
  points: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("promos", promoSchema);
