
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utlis/errorHandler.js'
export const SingUp=async  (req,res,next) => {
    // get data from body 
    const {username,email,password} = req.body


    // validate data 

    if(!username || !email || !password || username==="" || email==="" || password===""){
        
        // send error to middleware 

        return next(errorHandler({message:"all fields required",statusCode:400}))
    }

    //hash the password 

    const hashedPassword = await bcryptjs.hashSync(password,10)
    
    // create new user 

    const newUser =new User( {
        username,
        email,
        password:hashedPassword
    }
    )
    
    try {
        // save user
    
        await newUser.save()
        
        // send response
    
        res.status(201).json({message:"User created",newUser})
    } 
    
    catch (error) {
        // send error to middleware
        next(error)
    }

}