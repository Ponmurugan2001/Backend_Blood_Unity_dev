const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type require"],
      enum: ["in", "out"],
    },
   
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      require: [true, "blood quanity is require"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "organisation is required"],
    },
   
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
