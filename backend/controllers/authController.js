const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
const Certificate = require("../models/certificate");

// REGISTER (admin can create users too)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user",
    });

    await Certificate.updateMany(
      {
        email: email,
        user: null,
      },
      {
        $set: {
          user: user._id,
        },
      }
    );
    res.json({ msg: "User created", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// LOGIN (SECURE SESSION)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({ accessToken, role: user.role, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// REFRESH TOKEN
exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ msg: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token)
      return res.status(403).json({ msg: "Invalid session" });

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ msg: "Invalid refresh token" });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const user = await User.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie("refreshToken");
  res.json({ msg: "Logged out" });
};