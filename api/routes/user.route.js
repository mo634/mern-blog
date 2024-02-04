import express from "express"
import { test, updateUsre } from "../controllers/user.controller.js"
import { verifyToken } from "../utlis/verifyUser.js"

const router = express.Router() 

router.get("/",test)

router.put("/user-update/:userId",verifyToken,updateUsre)

export default router