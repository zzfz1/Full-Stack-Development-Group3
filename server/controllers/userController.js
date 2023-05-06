import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";

class UserController {
  async registerUser(req, res) {
    try {
      const { name, username, email, password, isAdmin, img } = req.body;
      console.log(req.body);

      const userEmailExists = await User.findOne({ email });
      const userUsernameExists = await User.findOne({ username });

      if (userEmailExists || userUsernameExists) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
        isAdmin,
        img,
      });
      const savedUser = await newUser.save();
      console.log("the new user is " + savedUser);
      res.cookie("token", generateToken(savedUser._id, savedUser.isAdmin), {
        httpOnly: true,
      });
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        username: savedUser.username,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error: ", error });
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
          name: user.name,
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

  async getUserBySlug(req, res) {
    console.log(" inside the getUserBySlug func", req.body);
    try {
      const user = await User.findOne({ slug: req.params.slug });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        _id: user._id,
        name: user.name,
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
      const page = req.query.page;

      const users = page
        ? await User.find()
            .sort({ _id: -1 }) // use _id instead of __id
            .limit(5)
            .skip((page - 1) * 5)
        : await User.find();

      res.status(200).json(
        users.map((user) => {
          return {
            _id: user._id,
            name: user.name,
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

  async updateUserBySlug(req, res) {
    try {
      const user = await User.findOne({ slug: req.params.slug });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { name, username, email, isAdmin, img } = req.body;

      if (name) user.name = name;

      if (username) {
        const existingUsername = await User.findOne({ username });
        if (
          existingUsername &&
          existingUsername._id.toString() !== user._id.toString()
        ) {
          return res.status(400).json({ message: "Username already taken" });
        }
        user.username = username;
      }

      if (email) user.email = email;
      if (isAdmin !== undefined) user.isAdmin = isAdmin;
      if (img) user.img = img;

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
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

  async resetUserPassword(req, res) {
    const newPassword = req.body.password;
    const username = req.body.username;
    console.log("the user name is ", username);
    try {
      const user = await User.findOne({ username: username });
      console.log("the user", user);
      if (user) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatePass = User.updateOne(
          { username: username },
          { password: hashedPassword }
        );
        res.status(200).json({ message: "password reset it" });
      } else {
        res.status(400).json({ message: "Wrong User not found!" });
      }
    } catch (error) {
      console.log("the Error: ", error);
    }
  }

  async userStats(req, res) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

export default UserController;
