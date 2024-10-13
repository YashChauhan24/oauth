import express from "express";
import {
  getUserProfile,
  googleAuth,
  googleAuthCallback,
  logout,
} from "../controller/Controller.js";

const router = express.Router();

// router.post("/", googleAuth);
// router.get("/github/callback", getGitauth);
// router.post("/fb", facebookAuth);

router.get("/google", googleAuth);

// OAuth callback route
router.get("/google/callback", googleAuthCallback);

// Get user profile
router.get("/profile", getUserProfile);

// Logout
router.get("/logout", logout);

export default router;
