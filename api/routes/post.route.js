import express from "express"
import {create} from "../controllers/post.controller.js"
import {verifyToken} from "../utlis/verifyUser.js"
const router = express.Router() 

router.post("/create-post",verifyToken,create)


export default router