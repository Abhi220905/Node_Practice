const User = require("../models/user.model");
const { plainToHash, hashToPlain } = require("../utils/password");

exports.signup = async (req, res) => {
  console.log(req.body);
  const { email, password, username, mobile } = req.body;

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
  };

  req.session.user = payload;

  res.json({
    success: true,
    message: "Login Successfully",
  });
};


exports.getProfile = async (req, res) => {
  res.json("Get Profiles")
}