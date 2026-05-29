const Certificate = require("../models/certificate");
const generateCertificate = require("../utils/generateCertificate");

// 🔍 VERIFY
exports.verifyCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findOne({
      certificateId: req.params.id.toUpperCase(),
    });

    if (!cert) {
      return res.status(404).json({ msg: "Invalid Certificate" });
    }


    if (!cert.verified || cert.verified === 0) {
      cert.verified = 1;
      await cert.save();
    }

    res.json(cert);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📄 DOWNLOAD PDF
exports.downloadCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findOne({
      certificateId: req.params.id.toUpperCase(),
    });

    if (!cert) {
      return res.status(404).json({ msg: "Certificate not found" });
    }

    cert.downloads = (cert.downloads || 0) + 1;
    await cert.save();

    generateCertificate(res, cert);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📊 STATS (for your dashboard)
exports.getStats = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      user: req.user.id,
    });

    const downloads = certificates.reduce(
      (sum, cert) => sum + (cert.downloads || 0),
      0
    );

    const verified = certificates.reduce(
      (sum, cert) => sum + (cert.verified || 0),
      0
    );

    res.json({
      downloads,
      verified,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.viewCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findOne({
      certificateId: req.params.id.toUpperCase(),
    });

    if (!cert) {
      return res.status(404).json({ msg: "Certificate not found" });
    }


    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");

    generateCertificate(res, cert, true); // same function

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};