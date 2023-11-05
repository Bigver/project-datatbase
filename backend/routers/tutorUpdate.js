import express from "express";
import {  updateTutor , getPostsTutor} from "../controllers/tutorUpdate.js";

const router = express.Router()

router.put("/", updateTutor)
router.get("/", getPostsTutor)



export default router