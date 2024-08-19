import express from "express";
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail, checkAuth } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


router.post('/login',login);
router.post('/signup',signup);
router.post('/logout',logout);
router.post('/verify-email',verifyEmail);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);

router.get('/check-auth', verifyToken, checkAuth);

export default router;