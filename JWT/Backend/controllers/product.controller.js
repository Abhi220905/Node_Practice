const Product = require("../models/product.model");

exports.store = async (req, res) => {
  console.log(req.body);
  const { category, sub_category, p_name, p_price } = req.body;
  await Product.create({ category, sub_category, p_name, p_price })
    .then(() => {
      res.json({
        success: true,
        message: "Product Added Sucessfull",
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
  
  await Product.find({}, { __v: 0 })
    .populate("category", "category_name -_id") // only category_name field will be populated from category collection
    .populate("sub_category", "sub_cat_name -_id") // only sub_cat_name field will be populated from sub_category collection
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
