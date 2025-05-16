const jwt = require("jsonwebtoken");
const User = require("../model/user")

const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, payload) => {
    if (err) return res.sendStatus(403);
    const user = await User.findById(payload.id)
    req.user = user;
    next();
  });
};
