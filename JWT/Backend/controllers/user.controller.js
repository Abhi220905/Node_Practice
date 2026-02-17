const User = require("../models/user.model");
const { plainToHash, hashToPlain } = require("../utils/password");
const sendMailer = require("../config/mailer");
const otpGenerator = require("otp-generator");
const { forgotPasswordTemplate } = require("../utils/mailFormat");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  console.log(req.body);
  const { email, password, username, mobile } = req.body;
  console.log(req.body);
  const hash_pass = await plainToHash(password);
  // res.json(hash_pass)

  await User.create({ email, password: hash_pass, username, mobile })
    .then(() => {
      res.json({
        success: true,
        message: "Register Sucessfull",
      });
    })

    .catch((error) => {
      res.json({
        success: false,
        message: error.message,
      });
    });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //// check email id

    //// email id exist hogi to data aayega otherwise it will be rutern null
    const existUser = await User.findOne({ email });
    // res.json(existUser)
    if (!existUser) {
      return res.json({
        success: false,
        message: "Email ID Not exist",
      });
    }

    // res.json(existUser.password)

    const match = await hashToPlain(password, existUser?.password);
    // res.json(match);

    if (!match) {
      return res.json({
        success: false,
        message: "password Not match",
      });
    }

    const payload = {
      id: existUser._id,
      email: existUser.email,
      name: existUser.username,
      role_id: existUser.role_id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // res.json(token)
  
    // req.session.user = payload;

    // res.json({
    //   success: true,
    //   message: "Login Successfully",
    //   token: token,
    // });

    res.header("token", token).json({
      success: true,
      message: "Login Successfully",
      token: token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// exports.getProfile = async (req, res) => {
//   res.json("Get Profiles");
// };

// exports.checkAuth = async (req, res) => {
//   const token = req.session?.user;
//   // res.json(token);
//   if (!token) {
//     return res.json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }
//   res.json({
//     success: true,
//     message: "Authorized",
//     user: token,
//   });
// };

// exports.removeCookie = async (req, res) => {
//   const token = req.session?.user;
//   // res.json(token);
//   if (token) {
//     req.session = null;
//     return res.json({
//       success: true,
//       token: null,
//       message: "User already logged out",
//     });
//   }
// };

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email });
  if (!existUser) {
    return res.json({
      success: false,
      message: "Email ID Not exist",
    });
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  // res.json(otp)
  // console.log(req.body)

  await User.findByIdAndUpdate(existUser._id, { otp });
  await sendMailer(
    existUser.email,
    "Your OTP for password reset",
    forgotPasswordTemplate(otp),
  );
  res.json({
    success: true,
    message: "OTP sent to email",
    otp,
  });
};

exports.verifyOtp = async (req, res) => {
  const { password, otp } = req.body;
  const otpMatch = await User.findOne({ otp });
  // res.json(otpMatch);
  if (!otpMatch) {
    return res.json({
      success: false,
      message: "Invalid OTP",
    });
  }
  const hash_pass = await plainToHash(password);
  // res.json(hash_pass);
  await User.findByIdAndUpdate(otpMatch._id, {
    password: hash_pass,
    otp: null,
  })
    .then(() => {
      res.json({
        success: true,
        message: "Password updated successfully",
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        message: error.message,
      });
    });
};


exports.changePassword = async (req, res) => {
  const {id} = req.user
  const { old_password, new_password } = req.body;
  const user = await User.findById(id)
  const hash_pass = user.password
  const match = await hashToPlain(old_password, hash_pass);
  // res.json(match)
  if(!match){
    return res.json({
      success: false,
      message: "Old password not match"
    })
  }

  const hashPass = await plainToHash(new_password)
  // res.json(hashPass)
  await User.findByIdAndUpdate(id, {password: hashPass})
    .then(() => {
      res.json({
        success: true,
        message: "Password changed successfully"
      })
    })
    .catch((error) => {
      res.json({
        success: false,
        message: error.message
      })
    })
}