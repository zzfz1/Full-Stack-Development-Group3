import jwt from "jsonwebtoken";

const generateToken = (userId, isAdmin) => {
  return jwt.sign({ _id: userId, isAdmin: isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
