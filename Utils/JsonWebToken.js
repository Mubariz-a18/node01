const jwt = require("jsonwebtoken");

// Create Jsonwebtoken 

exports.createJwtToken = async(email, userId) => {
  const token = jwt.sign(
    { email, userId },
    "secretkey007",
    {}
  );
  return token;
};
