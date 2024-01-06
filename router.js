const express = require("express");
const router = express.Router();
const { registerUser, deleteUser, verifyUser, authenticateToken } = require("./userControllers");

// Create user
router.post("/user/register", registerUser);

//Delete User
router.delete("/user/delete", deleteUser);

//Validate credentials
router.post("/user/sign-in", verifyUser);

//Authenticate JWT Token
router.post("/user/auth", authenticateToken);

module.exports = router;
