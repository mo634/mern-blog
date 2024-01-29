
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utlis/errorHandler.js'
import jwt from 'jsonwebtoken'
export const singUp=async  (req,res,next) => {
    // get data from body 
    const {username,email,password} = req.body


    // validate data 

    if(!username || !email || !password || username==="" || email==="" || password===""){
        
        // send error to middleware 
        return next(errorHandler(400,"all fields required"))
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


export const singIn=async (req,res,next) => { 
    
    // get data from body
    const {email , password} = req.body 

    try {
        // validate data
    if(!email || !password || email==="" || password===""){
        return next(errorHandler(400,"all field required"))
    }

    // find user
    const validUser =await User.findOne({email})

    if(!validUser){
        console.log("first")
        return next(errorHandler(404,"invalid email"))
    }

    // compare password
    const validPassword = bcryptjs.compareSync(password,validUser.password)

    if(!validPassword){
        return next(errorHandler(401,"invalid password"))
    }

    //hash the tokent  
    const token = jwt.sign({id:validUser._id},process.env.SECRET_KEY)

    const {password:pass , ...rest} = validUser._doc
    // store credentials in cookie & sent response 
    res.status(200).cookie("access_token",token,{httpOnly:true}).json({message:"login success"
    ,"user":rest
})

    } catch (error) {
        next(error)
    }
}