import express from "express"
import { test, updateUsre,deleteUser, signout, getUsers, getUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utlis/verifyUser.js"

const router = express.Router() 

router.get("/",test)

router.put("/user-update/:userId",verifyToken,updateUsre)

router.delete("/user-delete/:userId",verifyToken,deleteUser)

router.get("/signout",signout)

router.get("/get-users",verifyToken , getUsers)

router.get("/:userId", getUser)

export default router