const SubCategory = require("../models/subCategory.model");

exports.store = async (req, res) => {
  console.log(req.body);
  const { category, sub_cat_name } = req.body;
  await SubCategory.create({ category, sub_cat_name })
    .then(() => {
      res.json({
        success: true,
        message: "Sub Category Added Sucessfull",
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        message: error.message,
      });
    });
};

exports.index = async (req, res) => {
  // res.json("get API for category" )
  // populate is used to get the data of category from category collection

  // await SubCategory.find().populate("category", "category_name, _id, status, createdAt, updatedAt, __v")
  // await SubCategory.find().populate("category", "-__v");  // -__v means we do not want to get the __v field from category collection
  
  await SubCategory.find()
    .populate("category", "category_name") // only category_name field will be populated from category collection
    .then((data) => {
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        message: error.message,
      });
    });
};
