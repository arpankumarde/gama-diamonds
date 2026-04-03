import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import User, { type IUser } from "../models/user.js";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface UpdateRoleBody {
  role: "customer" | "admin";
}

const signToken = (userId: string, role: string) =>
  jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: "7d" });

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export async function register(req: Request<{}, {}, RegisterBody>, res: Response) {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      ...(phone && { phone }),
      role: "customer"
    });

    const token = signToken(user._id.toString(), user.role);
    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function login(req: Request<{}, {}, LoginBody>, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: "Account is deactivated" });
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      return res.status(423).json({ success: false, message: "Account temporarily locked" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      await user.save({ validateBeforeSave: false });
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Reset login attempts on success
    user.loginAttempts = 0;
    user.lockUntil = null;
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id.toString(), user.role);

    // Set separate cookie name for admin vs customer for clarity
    const cookieName = (user.role === "admin" || user.role === "superadmin") ? "adminToken" : "token";
    res.cookie(cookieName, token, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message || "Login failed" });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const user = await User.findById(req.user!.userId).select("-passwordHash -loginAttempts -lockUntil -__v");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  res.clearCookie("adminToken");
  res.status(200).json({ success: true, message: "Logged out successfully" });
}

// Only for first-time setup or super admin creation
export async function createAdmin(req: Request, res: Response) {
  try {
    const { name, email, password, setupToken } = req.body;

    // Security: Only allow if SETUP_TOKEN env var matches
    if (process.env.SETUP_TOKEN && setupToken !== process.env.SETUP_TOKEN) {
      return res.status(401).json({ success: false, message: "Invalid setup token" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await User.create({
      name,
      email,
      passwordHash,
      role: "admin",
      isActive: true,
      loginAttempts: 0,
    });

    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
      user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error: any) {
    console.error("Admin creation error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to create admin" });
  }
}

// Superadmin only - update user role
export async function updateUserRole(req: Request<{ id: string }, {}, UpdateRoleBody>, res: Response) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !["customer", "admin"].includes(role)) {
      return res.status(400).json({ success: false, message: "Role must be 'customer' or 'admin'" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role === "superadmin") {
      return res.status(403).json({ success: false, message: "Superadmin role cannot be changed" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      data: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Admin only
export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.find().select("-passwordHash -loginAttempts -lockUntil -__v");
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
