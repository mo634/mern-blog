import { errorHandler } from "../utlis/errorHandler.js"
import bcryptjs from "bcryptjs"
export const validatePassword = async (password, next) => {
    if (password.length < 6) {
        return next(errorHandler(400, "password must be at least 6 characters"))
    }

    return await bcryptjs.hashSync(password, 10)
}
export const validateUsername = (username,next) => {


    if (username.length < 7 || username.length > 20) {
        return next(errorHandler(400, "username must be between 7 and 20 characters"))
    }

    if (username.includes(" ")) {
        return next(errorHandler(400, "username must not contain spaces"))
    }

    return true
}