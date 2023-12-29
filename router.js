const express = require("express");
const router = express.Router();
const { registerUser, deleteUser, updateUser, verifyUser } = require("./userControllers");

// Create user
router.post("/user/register", registerUser);

//Delete User
router.delete("/user/delete", deleteUser);

//Update credentials
router.patch("/user/update", updateUser);

//Validate credentials
router.get("/sign-in", verifyUser);

module.exports = router;
