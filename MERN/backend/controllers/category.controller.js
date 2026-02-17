const Category = require("../models/category.model");

exports.store = async (req, res) => {
  const { name } = req.body;
  await Category.create({ name })
    .then(() => {
      res.json({
        success: true,
        message: "Category Added Sucessfull",
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
    res.json("get API for category" )
//   await Category.find()
//     .then((data) => {
//       res.json({
//         success: true,
//         data,
//       });
//     })
//     .catch((error) => {
//       res.json({
//         success: false,
//         message: error.message,
//       });
//     });
};
