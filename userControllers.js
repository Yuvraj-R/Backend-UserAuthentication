const User = require("./userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = require("./verifyToken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Both email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      // Generate a salt
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email, hashedPass, salt });
        return res.status(200).json({ response: "User was successfully created" });
      } catch (error) {
        throw error;
      }
    } else {
      return res.status(400).json({ response: "User with this email already exists" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { token, email } = req.body;
  if (!token) {
    return res.status(404).json({ error: "No token provided" });
  }
  try {
    if (verifyToken(token)) {
      const user = await User.findOneAndDelete({ email: email });
      return res.status(200).json({ response: "User was successfully deleted" });
    } else {
      return res.status(404).json({ error: "Unable to authenticate" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Both email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //Check that passwords match
    try {
      const arguedPassword = await bcrypt.hash(password, user.salt);
      if (arguedPassword === user.hashedPass) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "30s",
        });
        return res.status(200).json({ token });
      } else {
        return res.status(404).json({ authenticated: false });
      }
    } catch (error) {
      throw error;
    }
  } catch (error) {
    return res.status(400).json({ authenticated: false, error: error.message });
  }
};

module.exports = { registerUser, deleteUser, verifyUser };
