const {  Schema, model } = require("mongoose");
const { commonString } = require("../utils/common");

const blogSchema = new Schema({
    b_title: commonString,
    b_cat: commonString
},{timestamps:true})

const Blog = model("Blog", blogSchema)
module.exports = Blog