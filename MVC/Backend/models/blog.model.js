const { Schema, model } = require("mongoose");
const { commonString } = require("../utils/common");

const blogSchema = new Schema({
    b_title: commonString,
    b_cat: commonString,
    b_image: {
        ...commonString, // already is in object so we will using spred operator 
        required: false
    }
}, { timestamps: true })

const Blog = model("Blog", blogSchema)
module.exports = Blog