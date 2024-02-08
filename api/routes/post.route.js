import express from "express"
import {create, getPosts} from "../controllers/post.controller.js"
import {verifyToken} from "../utlis/verifyUser.js"
const router = express.Router() 

router.post("/create-post",verifyToken,create)

router.post("/get-posts",getPosts)

export default router