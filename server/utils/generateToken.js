import jwt from "jsonwebtoken";

export const generateToken = (userId, isAdmin, slug) => {
  return jwt.sign(
    { _id: userId, isAdmin: isAdmin, slug: slug },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const generateTokenEmail = (userId, isAdmin) => {
  return jwt.sign({ _id: userId, isAdmin: isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};
