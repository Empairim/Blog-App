import express from "express";
import { register } from "../controllers/auth.js"; //dont forget import em
import { login } from "../controllers/auth.js";
import { logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/auth/register", register); //the functions are in controllers
router.post("/auth/login", login); //the functions are in controllers
router.post("/auth/logout", logout); //the functions are in controllers

export default router;
