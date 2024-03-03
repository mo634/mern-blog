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

            const hashedPassword = await validatePassword(req.body.password, next)

            if (!hashedPassword) return;

            req.body.password = hashedPassword;

        }

        if (req.body.username) {
            const username = validateUsername(req.body.username, next)

            if (!username) return
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
            { new: true }
        )

        const { password: pass, ...rest } = updateUser._doc

        console.log(updateUser)

        res.status(200).json({ message: "user updated", user: rest })
    } catch (error) {
        next(errorHandler(error.statusCode, error.message))
    }

}


export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.params.userId !== req.user.id) {
        return next(errorHandler(401, "unauthorized user"))
    }
    try {

        await User.findByIdAndDelete(req.user.id)

        res.status(200).json("user deleted successfuly")

    } catch (error) {
        next(errorHandler(error.statusCode, error.message))
    }
}

export const signout = (req, res, next) => {
    try {
        res
            .clearCookie('access_token')
            .status(200)
            .json('User has been signed out');
    } catch (error) {
        next(errorHandler(error.statusCode, error.message))
    }
}

export const getUsers = async (req, res, next) => {
    // if(!req.body.isAdmin){
    //     return next(errorHandler(401,"unauthorized user"))
    // }

    try {
        const startIndex = req.query.startIndex || 0

        const limit = req.query.limit || 9

        const sort = req.query.sort === "asc" ? 1 : -1

        const users = await User.find().sort({ createdAt: sort }).skip(startIndex).limit(limit)

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc

            return rest
        })


        const totalUser = await User.countDocuments()

        const now = new Date()

        const onMonthAgo = new Date(

            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthUsers = await User.countDocuments({

            createdAt:{$gte: onMonthAgo}
        })


        res.status(200).json({
            users: usersWithoutPassword,
            totalUser,
            lastMonthUsers

        })
    }

    catch (error) {
        next(error)
    }
}


export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        
        if (!user) {
            return next(errorHandler(404, "user not found"))
        }
        const { password, ...rest } = user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}