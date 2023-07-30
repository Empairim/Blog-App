import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts); //fetching all post
router.get("/:id", getPost); //fetching all post using id
router.post("/", addPost); //creat all post
router.delete("/:id", deletePost); //delete all post using id
router.put("/:id", updatePost); //update all post using id

export default router;
