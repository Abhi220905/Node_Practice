const jwt = require("jsonwebtoken");
exports.verifyUser = (req, res, next) => {
  try {
    const verify = req?.session?.user;
    // res.json(req.headers.authorization)

    let token = req.headers.authorization;
    if (!token) {
      return res.json({
        success: false,
        message: "User not authenticated",
      });
    }
    token = token?.split(" ")[1]; // Bearer token
    //   res.json(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    //   res.json(verifyToken);
    if (!verifyToken) {
      return res.json({
        success: false,
        message: "User not authenticated",
      });
    }
    req.user = verifyToken;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "User not authenticated",
    });
  }
};
