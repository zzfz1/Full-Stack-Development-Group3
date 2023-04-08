import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

class UserController {
  async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      res.status(201).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        token: generateToken(savedUser._id),
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
