const express = require("express");
const router = express.Router();

const Certificate = require("../models/certificate");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

//  GET ALL CERTIFICATES
router.get("/", auth, role, async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//  DELETE CERTIFICATE
router.delete("/:id", auth, role, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ msg: "Certificate deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", auth, role, async (req, res) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/reset-stats", async (req, res) => {
  try {
    await Certificate.updateMany({}, { downloads: 0, verified: 0 });
    res.json({ msg: "Stats reset successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const {
  verifyCertificate,
  downloadCertificate,
  getStats,
  viewCertificate,
} = require("../controllers/certificateController");

// PUBLIC ROUTES
router.get("/verify/:id", verifyCertificate);
router.get("/download/:id", downloadCertificate);
router.get("/view/:id", viewCertificate);

//  PROTECTED
router.get("/stats", auth, getStats);

module.exports = router;