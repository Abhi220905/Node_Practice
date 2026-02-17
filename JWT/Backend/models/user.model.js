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
    otp: String,
    role_id: {
      type:String,
      default: "user", 
      enum: ["admin", "user" ],
      required: true,
    }
    // role_id: {
    //   type:Number,
    //   default: 2, // 1 for admin and 2 for user
    //   enum: [1, 2],
    //   required: true,
    // }
  },
  { timestamps: true },
);

//////////////// create table

const User = model('User', userSchema)

module.exports = User