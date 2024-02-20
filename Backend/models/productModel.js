const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,},
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    purchasedDate: {
      type: Date,
      required: true,
    },
    purchasedSeason: {
      type: String,
      required: true,
    },
    availQuantity: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
