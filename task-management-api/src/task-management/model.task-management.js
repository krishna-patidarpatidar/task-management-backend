const mongoose = require("mongoose");
const listSchema = new mongoose.Schema(
  {
    listname: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId for references
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("list", listSchema);
