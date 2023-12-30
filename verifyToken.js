const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      // Token is expired
      return false;
    }

    // If verification is successful and the token is not expired, return true
    return true;
  } catch (error) {
    // If verification fails or the token is expired, return false
    return false;
  }
};

module.exports = verifyToken;
