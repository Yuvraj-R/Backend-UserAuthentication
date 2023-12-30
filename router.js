const express = require("express");
const router = express.Router();
const { registerUser, deleteUser, verifyUser } = require("./userControllers");

// Create user
router.post("/user/register", registerUser);

//Delete User
router.delete("/user/delete", deleteUser);

//Validate credentials
router.get("/user/verify", verifyUser);

module.exports = router;
