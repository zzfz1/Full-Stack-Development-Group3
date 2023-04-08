import User from "../models/user.js";

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied. You are not an admin." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default isAdmin;
