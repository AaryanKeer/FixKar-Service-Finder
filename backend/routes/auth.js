const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Ensure this path is correct

// ✅ Ensure `registerUser` and `loginUser` are properly imported
router.post("/signup", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
