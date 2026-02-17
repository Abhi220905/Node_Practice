const { Schema, model } = require("mongoose");
const { commonString } = require("../utils/common");

////////// Create schema

const categorySchema = new Schema(
  {
    category_name: {
      ...commonString,
      unique: [true, "Category Already Exist!!"],
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

const Category = model("Category", categorySchema);

module.exports = Category;
