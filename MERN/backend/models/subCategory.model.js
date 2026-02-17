const { Schema, model } = require("mongoose");
const { commonString } = require("../utils/common");

////////// Create schema

const subCategorySchema = new Schema(
  {
    category: {
      //   ...commonString,
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    sub_cat_name: {
      ...commonString,
      unique: [true, "Sub Category Already Exist!!"],
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

const SubCategory = model("SubCategory", subCategorySchema);

module.exports = SubCategory;
