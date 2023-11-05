import express from "express";
import { apply , getRecord, getRecordTutor , updateRecord} from "../controllers/record.js";

const router = express.Router();

router.post("/", apply);
router.put("/", updateRecord);
router.get("/:id", getRecord);
router.get("/tutor/:id", getRecordTutor);


export default router;
