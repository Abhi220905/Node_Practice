const { Schema, model } = require("mongoose");
const { commonString } = require("../utils/common");


////////// Create schema

const userSchema = new Schema(
  {
    username: commonString,
    email: {
      ...commonString,
      unique: [true, "Email ID Already Exist!!"],
    },
    mobile: {
      ...commonString,
      unique: [true, "Mobile Number Already Exist!!"],
    },
    password: commonString,
  },
  { timestamps: true },
);

//////////////// create table

const User = model('User', userSchema)

module.exports = User