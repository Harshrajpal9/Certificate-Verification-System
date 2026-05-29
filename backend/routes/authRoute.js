const express = require("express");
const router = express.Router();
const User = require("../models/user");

const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const verifyToken = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

// test admin route
router.get("/admin", auth, role, (req, res) => {
  res.json({ msg: "Admin dashboard access granted" });
});

router.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      msg: "Welcome User Dashboard",
      username: user.name, 
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
})


module.exports = router;