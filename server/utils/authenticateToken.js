import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    console.log("Unauthorized");
    return res.status(401).json({ message: "Unauthorized" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("error verifying token : " + err);
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

export { authenticateToken };
