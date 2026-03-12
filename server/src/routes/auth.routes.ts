import express from "express";
import { register, login, users, logout } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get ("/users",users );
router.get ("/logout",logout)



export default router;
