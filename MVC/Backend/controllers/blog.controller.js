const Blog = require("../models/blog.model");

exports.store = async (req, res) => {
    // console.log(req.body)
    // res.json(req.file.filename)
    const { b_title, b_cat } = req.body;
    Blog.create({ b_title, b_cat, b_image: req?.file?.filename })
        // using chainning operator for the handle error , when the img is not uploading then we will show the error , 
        // and this error can be handled by using chainning operator like this ( b_image: req?.file?.filename)
        .then(() => res.json("Data Inserted"))
        .catch((err) => res.json({
            success: false,
            message: err.message
        }))
}

exports.index = async (req, res) => {
    const records = await Blog.find()
    res.json({
        success: true,
        records: records.length > 0 ? records : "No Records"
    })

}