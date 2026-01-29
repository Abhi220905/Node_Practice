const Blog = require("../models/blog.model");

exports.store = async (req, res) => {
    console.log(req.body) 
    const { b_title, b_cat } = req.body;
    Blog.create({ b_title, b_cat })
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