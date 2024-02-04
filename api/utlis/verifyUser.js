
import jwt from "jsonwebtoken"
import { errorHandler } from "./errorHandler.js"

export const verifyToken = (req,res,next ) => { 
    // get token from cookie
    const token = req.cookies.access_token 

    if(!token){
        next(errorHandler(401,"user unauthorized"))
    }

    jwt.verify(
        
        token,
        
        process.env.SECRET_KEY,
        
        (err,user) => { 
            if(err) return next(errorHandler(401,"user unauthorized"))

            req.user = user
            next()
        }
    )

}