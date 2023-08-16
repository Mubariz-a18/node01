const jwt = require("jsonwebtoken");

// Verification Of Token 

exports.verifyJwtToken = async (req, res, next) => {

  // check for auth header from client
  const header = req.headers.authorization;
  if (!header) {
    return res.status(403).send("auth header is missing");
  }
  // verify  auth token
  const token = header.split("Bearer ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const { userId, email } = jwt.verify(
      token,
      "secretkey007"
    );
    req.userId = userId;
    req.email = email;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};