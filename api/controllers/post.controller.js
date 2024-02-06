import { errorHandler } from "../utlis/errorHandler.js"
import Post from "../models/post.model.js"
export const create = async (req, res, next) => {
    console.log(req.user.isAdmin)
    if(!req.user.isAdmin){
        return next(errorHandler(401, "unauthorized user"))
    }
    
    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post ({
        ...req.body,
        userId: req.user.id,
        slug
    })
    try {
        const savedPost = await newPost.save()
        
        res.status(200).json(savedPost)
    } catch (error) {
        next(error)
    }
}