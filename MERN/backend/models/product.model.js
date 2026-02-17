const { Schema, model } = require("mongoose");
const { commonString } = require("../utils/common");

////////// Create schema

const productSchema = new Schema(
  {
    category: {
      //   ...commonString,
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    sub_category: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    p_name: {
      ...commonString,
      unique: [true, "Product Name Already Exist!!"],
    },
    p_price: {
      ...commonString,
      type: Number,
    },
    status: {
      ...commonString,
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

//////////////// create table

const Product = model("Product", productSchema);

module.exports = Product;
