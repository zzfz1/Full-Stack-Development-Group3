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
      res.cookie("token", generateToken(savedUser._id, savedUser.isAdmin), {
        httpOnly: true,
      });
      res.status(201).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
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
        res.cookie("token", generateToken(user._id, user.isAdmin), {
          httpOnly: true,
        });
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
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

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUsers(req, res) {
    try {
      const page = req.query.page || 1;
      const users = query
        ? await User.find()
            .sort({ __id: -1 })
            .limit(5)
            .skip((page - 1) * 5)
        : await User.find();

      res.status(200).json(
        users.map((user) => {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        })
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    const password = req.body.password;
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
