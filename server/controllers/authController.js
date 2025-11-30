const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Jwt Token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register New User
// @route POST /api/auth/register
// @access Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, adminInviteToken } =
      req.body;

    // ✅ Check for required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Determine user role
    let role = "member";

    if (
      adminInviteToken &&
      adminInviteToken == process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImageUrl,
    });

    // Return User Data with JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Login User
// @route POST /api/auth/login
// @access Public

// @desc Login User
// @route POST /api/auth/login
// @access Public

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check for required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return user data with JWT
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc  Get User Profile
// @route GET /api/auth/profile
// @access Private (Require JWT)

const getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized, no user found in request" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// @desc Update user profile
// @route PUT /api/auth/profile
// @access Private (Require JWT)

const updateUserProfile = async (req, res) => {
  try {
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authorized, no user found in request" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10); 
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id), 
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
