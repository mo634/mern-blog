import express from "express"
import { SingUp } from "../controllers/auth.controller.js"

const router = express.Router()

// sing up route 

router.post("/sign-up",SingUp)

export default router