import express from "express"
import {create, deletePosts, getPosts,updatePost} from "../controllers/post.controller.js"
import {verifyToken} from "../utlis/verifyUser.js"
const router = express.Router() 

router.post("/create-post",verifyToken,create)

router.post("/get-posts",getPosts)

router.delete("/delete-post/:postId/:userId",verifyToken,deletePosts)

router.put("/update-post/:postId/:userId",verifyToken,updatePost)

export default router