const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const User = require("../models/user");

const upload = require("../middleware/upload");
const { uploadExcel } = require("../controllers/adminController");

router.post("/upload-excel", auth, role, upload.single("file"), uploadExcel);

// GET ALL USERS
router.get("/users", auth, role, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const bcrypt = require("bcryptjs");

// CREATE USER (ADMIN)
router.post("/users", auth, role, async (req, res) => {
  try {
    const { name, email, password, role: newRole } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: newRole || "user",
    });

    res.json({ msg: "User created by admin", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE USER
router.delete("/users/:id", auth, role, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
});

// UPDATE USER
router.put("/users/:id", auth, role, async (req, res) => {
  try {
    const { name, email, role: newRole } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // prevent duplicate email
    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ msg: "Email already exists" });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = newRole || user.role;

    await user.save();

    res.json({
      msg: "User updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const Certificate = require("../models/certificate");

// ADMIN STATS
router.get("/stats", auth, role, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const certificates = await Certificate.countDocuments();

    const verified = await Certificate.aggregate([
      { $group: { _id: null, total: { $sum: "$verified" } } }
    ]);

    const downloads = await Certificate.aggregate([
      { $group: { _id: null, total: { $sum: "$downloads" } } }
    ]);

    res.json({
      users,
      certificates,
      downloads: downloads[0]?.total || 0,
       verified: verified[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;