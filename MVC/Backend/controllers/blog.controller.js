const Blog = require("../models/blog.model");

exports.store = async (req, res) => {
  // console.log(req.body)
  // res.json(req.file.filename)
  const { b_title, b_cat } = req.body;
  Blog.create({ b_title, b_cat, b_image: req?.file?.filename })
    // using chainning operator for the handle error , when the img is not uploading then we will show the error ,
    // and this error can be handled by using chainning operator like this ( b_image: req?.file?.filename)
    .then(() => res.json("Data Inserted"))
    .catch((err) =>
      res.json({
        success: false,
        message: err.message,
      }),
    );
};

exports.index = async (req, res) => {
  const records = await Blog.find();
  // console.log(records)
  const newArr = records.map((ele) => {
    return {
      ...ele._doc, // to get all the data from the document then we can use ...ele._doc, it's part of mongoose
      b_image: ele.b_image
        ? `${process.env.SERVER}/uploads/${ele.b_image}`
        : `${process.env.DUMMY_IMG_URL}`, // if image is present then we will show the image otherwise we will show the dummy image
    };
  });
  console.log(newArr);
  res.json({
    success: true,
    records: newArr.length > 0 ? newArr : "No Records",
  });
};

exports.trash = async (req, res) => {
  const { id } = req.query;
  Blog.findByIdAndDelete(id).then(() =>
    res.json({ success: true, message: "Record Deleted" }),
  );
};
