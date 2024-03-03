import express from "express"
import { verifyToken } from "../utlis/verifyUser.js"
import { addComment, commnetDelete, commnetEdit, commnetLike, getComment } from "../controllers/comment.controller.js"

const router = express.Router()

router.post("/add-comment",verifyToken,addComment)

router.get("/get-comment/:postId",getComment)

router.put("/comment-like/:commentId",verifyToken,commnetLike)

router.put("/comment-edit/:commentId",verifyToken,commnetEdit)

router.delete("/comment-delete/:commentId",verifyToken,commnetDelete)

export default router