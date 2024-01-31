import express from "express"
import { singUp,singIn, google } from "../controllers/auth.controller.js"

const router = express.Router()

// sing up route 

router.post("/sign-up",singUp)
router.post("/sign-in",singIn)
router.post("/google",google)

export default router