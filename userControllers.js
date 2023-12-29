const User = require("./userModel");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ error: "Both fields are missing" });
  } else if (!email) {
    return res.status(400).json({ error: "'Email' field is missing" });
  } else if (!password) {
    return res.status(400).json({ error: "'Password' field is missing" });
  }

  try {
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      const newUser = await User.create({ email, password });
      return res.status(200).json({ response: "User was successfully created" });
    } else {
      return res.status(400).json({ response: "User with this email already exists" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ error: "Both fields are missing" });
  } else if (!email) {
    return res.status(400).json({ error: "'Email' field is missing" });
  } else if (!password) {
    return res.status(400).json({ error: "'Password' field is missing" });
  }
  try {
    const user = await User.findOneAndDelete({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json({ response: "User was successfully deleted" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { oEmail, oPassword, nEmail, nPassword } = req.body;

  if (!oEmail && !oPassword) {
    return res.status(400).json({ error: "Both fields are missing" });
  } else if (!oEmail) {
    return res.status(400).json({ error: "'Email' field is missing" });
  } else if (!oPassword) {
    return res.status(400).json({ error: "'Password' field is missing" });
  }

  let updateObject = {};

  if (nEmail) {
    updateObject.email = nEmail;
  }

  if (nPassword) {
    updateObject.password = nPassword;
  }

  if (Object.keys(updateObject).length === 0) {
    return res.status(400).json({ error: "Fields to update are missing" });
  }

  let user;

  try {
    user = await User.findOneAndUpdate({ email: oEmail }, updateObject);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json({ response: "User was successfully updated" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ error: "Both fields are missing" });
  } else if (!email) {
    return res.status(400).json({ error: "'Email' field is missing" });
  } else if (!password) {
    return res.status(400).json({ error: "'Password' field is missing" });
  }

  try {
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.status(404).json({ error: "One or more fields are incorrect" });
    } else {
      return res.status(200).json({ response: "Login successful" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, deleteUser, updateUser, verifyUser };
