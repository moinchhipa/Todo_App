const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    //Get Token from header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ message: "No Token, access denied" });
    }

    //Format: Bearer Token
    const parts = authHeader.split(" ");
    const token = parts[1];

    console.log("Token:", token);
    console.log("Token type:", typeof token);
    
    if (!token) {
      return res.json({ message: "Invalid Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = authMiddleware;
