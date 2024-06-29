const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const racSchema = new Schema(
  {
    rac: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rac", racSchema);
