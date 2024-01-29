import express from "express"
import { singUp,singIn } from "../controllers/auth.controller.js"

const router = express.Router()

// sing up route 

router.post("/sign-up",singUp)
router.post("/sign-in",singIn)

export default router