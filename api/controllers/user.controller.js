import User from "../models/user.model.js";
import { validatePassword, validateUsername } from "../utlis/credentialsConstrains.js";
import { errorHandler } from "../utlis/errorHandler.js"
import bcryptjs from "bcryptjs"
export const test = (req, res) => {
    res.json({ "message": "hello from user controller" })
}

export const updateUsre = async (req, res, next) => {
    // add upadte logic
    try {
        const { userId } = req.params


        if (userId !== req.user.id) {
            return res.status(401).json({ "message": "unauthorized user" })
        }

        // add constrains on credentials for security 

        if (req.body.password) {

            const hashedPassword =await validatePassword(req.body.password ,next)

            if (!hashedPassword) return; 

            req.body.password = hashedPassword;

        }

        if (req.body.username) {
            const username = validateUsername(req.body.username, next)

            if(!username) return
        }

        // update user
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    googlePhotoUrl: req.body.googlePhotoUrl,
                    password: req.body.password,
                }
            },
            {new:true}
        )

        const { password: pass, ...rest } = updateUser._doc

        console.log(updateUser)

        res.status(200).json({ message: "user updated", user:rest })
    } catch (error) {
        next(errorHandler(error.statusCode, error.message))
    }

}


export const deleteUser = async(req,res,next) => { 
    // delete logic
    try {

        //check the same ID ? 
        if(req.params.userId !== req.user.id){
            return next(errorHandler(401,"unauthorized user"))
        }

        await User.findByIdAndDelete(req.user.id)

        res.status(200).json("user deleted successfuly")

    } catch (error) {
        next(errorHandler(error.statusCode, error.message))
    }
}

export const signout =(req,res,next) => { 
    try {
        res
        .clearCookie('access_token')
        .status(200)
        .json('User has been signed out');
    } catch (error) {
        next(errorHandler(error.statusCode, error.message))
    }
}