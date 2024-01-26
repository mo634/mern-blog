
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
export const SingUp=async  (req,res) => {
    // get data from body 
    const {username,email,password} = req.body


    // validate data 

    if(!username || !email || !password || username==="" || email==="" || password===""){
        return res.status(400).json({message:"Please add all fields"})
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
        res.status(500).json({message:"duplicate inputs",error})
    }

}