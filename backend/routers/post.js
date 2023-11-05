import express from "express";
import { addPost , getPosts , updatePost , getPostsTutor ,getPost , deletePost} from "../controllers/post.js";

const router = express.Router();

router.post("/", addPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/postTutor", getPostsTutor);
router.put("/", updatePost);
router.delete("/:id", deletePost);



export default router;
