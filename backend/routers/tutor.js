import express from "express";
import { loginTotor,registerTotor,logoutTotor } from "../controllers/tutor.js";

const router = express.Router()

router.post("/login", loginTotor)
router.post("/register", registerTotor)
router.post("/logout", logoutTotor)


export default router