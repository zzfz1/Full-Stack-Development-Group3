import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import { mailTransport } from "../utils/sendFeedback.js";

class UserController {
  async registerUser(req, res) {
    try {
      const { name, username, email, password, isAdmin, img, shippingAddress } = req.body;

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
        shippingAddress,
      });
      const savedUser = await newUser.save();
      console.log("the new user is " + savedUser);
      res.cookie("token", generateToken(user._id, user.isAdmin, user.slug), {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        username: savedUser.username,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        slug: savedUser.slug,
        img: savedUser.img,
        shippingAddress: savedUser.shippingAddress,
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
        res.cookie("token", generateToken(user._id, user.isAdmin, user.slug), {
          sameSite: "none",
          httpOnly: true,
          secure: true,
        });
        res.status(200).json({
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          slug: user.slug,
          img: user.img,
          shippingAddress: user.shippingAddress,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async checkUser(req, res) {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email });
      res.status(200).json(user ? true : false);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async googleLogin(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        res.cookie("token", generateToken(user._id, user.isAdmin, user.slug), {
          sameSite: "none",
          httpOnly: true,
          secure: true,
        });
        res.status(200).json({
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          slug: user.slug,
          img: user.img,
          shippingAddress: user.shippingAddress,
        });
      } else {
        res.status(404).json({ message: "No such User" });
      }
    } catch (error) {
      console.error(error.message);
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
        slug: user.slug,
        img: user.img,
        shippingAddress: user.shippingAddress,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUsers(req, res) {
    try {
      const page = req.query.new;

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
            slug: user.slug,
            img: user.img,
            shippingAddress: user.shippingAddress,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
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

      const { name, username, email, isAdmin, img, shippingAddress, password } = req.body;

      if (name) user.name = name;

      if (username) {
        const existingUsername = await User.findOne({ username });
        if (existingUsername && existingUsername._id.toString() !== user._id.toString()) {
          return res.status(400).json({ message: "Username already taken" });
        }
        user.username = username;
      }

      if (email) user.email = email;
      if (isAdmin !== undefined) user.isAdmin = isAdmin;
      if (img) user.img = img;
      if (shippingAddress) user.shippingAddress = shippingAddress;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        slug: updatedUser.slug,
        img: updatedUser.img,
        shippingAddress: updatedUser.shippingAddress,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
  async updateOrAddShippingAddress(req, res) {
    try {
      const user = await User.findById(req.params.id); // ID of the user
      const body = req.body;
      const shippingAddressId = body._id; // ID of the shipping address (optional)

      if (user) {
        if (shippingAddressId) {
          const shippingAddressIndex = user.shippingAddress.findIndex((address) => address._id.toString() === shippingAddressId);

          if (shippingAddressIndex !== -1) {
            user.shippingAddress[shippingAddressIndex] = body;
            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
          } else {
            res.status(404).json({ message: "Shipping address not found" });
          }
        } else {
          const newShippingAddress = req.body;
          user.shippingAddress.push(newShippingAddress);
          const updatedUser = await user.save();
          res.status(200).json(updatedUser);
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async deleteShippingAddress(req, res) {
    try {
      const user = await User.findById(req.params.userId); // ID of the user
      const shippingAddressId = req.params.shippingAddressId; // ID of the shipping address

      if (user) {
        const shippingAddressIndex = user.shippingAddress.findIndex((address) => address._id.toString() === shippingAddressId);

        if (shippingAddressIndex !== -1) {
          user.shippingAddress.splice(shippingAddressIndex, 1);
          const updatedUser = await user.save();
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ message: "Shipping address not found" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
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

  async resetUserPassword(req, res) {
    const newPassword = req.body.newPassword;
    const slug = req.params.slug;
    try {
      const user = await User.findOne({ slug: slug });
      console.log("the user", user);
      if (user) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatePass = await User.updateOne({ slug: slug }, { password: hashedPassword });
        res.status(200).json({ message: "password reseted" });
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
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async feedback(req, res) {
    const { name, email, message } = req.body;
    try {
      mailTransport(name, email, message);
      res.json({ message: "Your feedback has been sent to the admin!" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default UserController;
