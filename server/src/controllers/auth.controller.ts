import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import type { Request, Response } from "express";
import { User } from "../models/index.js";
 
const secret = process.env.JWT_SECRET || "default-secret-key-change-in-production";

interface DecodedToken extends JwtPayload {
  id: string;
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      role
    });

    const token = jwt.sign(
      { id: user._id.toString() },
      secret,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: "Registration failed",
      error: errorMessage
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const isUserExists = await User.findOne({ email: email as string });

    if (!isUserExists) {
      return res.status(401).json({
        message: "User account not found"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExists.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: isUserExists._id.toString() },
      secret,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    res.status(200).json({
      message: "User logged in successfully"
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: errorMessage
    });
  }
}

export async function users(req: Request, res: Response) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access"
    });
  }
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(decoded.id)
    }).select("-passwordHash -__v").lean();
    res.status(200).json({
      message: "user data fetched Successfully",
      user
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized- Invalid Token"
    });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie('token');
  res.status(200).json({
    message: "user logged out successfully"
  });
}
