import { errorHandler } from "../utlis/errorHandler.js"
import Post from "../models/post.model.js"
export const create = async (req, res, next) => {

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

export const getPosts = async (req, res, next) => {
    try {
        const startIndex = req.query.startIndex || 0 

        const limit = req.query.limit || 9 

        const order = req.query.order === "asc"? 1 : -1

        const posts = await Post.find(
            {
                ...(req.query.userId && {userId: req.query.userId}),
                ...(req.query.category && {category: req.query.category}),
                ...(req.query.slug && {slug: req.query.slug}),
                ...(req.query.postId && {_id: req.query.postId}),

                // flexible search term 

                ...(req.query.searchTerm && {
                    $or:[
                        {title: {$regex: req.query.searchTerm ,$options: "i"}},
                        {content : {$regex: req.query.searchTerm ,$options: "i"}},
                    ]
                })


            }
        ).sort({createdAt: order}).limit(limit).skip(startIndex)

        const totalPosts = await Post.countDocuments()

        // get last month posts created 
        const now =new  Date()
        
        const lastMonth = new Date (
            now.getFullYear()// return cuurent year
            ,now.getMonth() - 1 // retunr last month
            ,now.getDate() // return current date "days"
        ) 

        const lastMonthPosts = await Post.countDocuments(
            {createdAt: {$gte: lastMonth}}
            )


        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })

    } catch (error) {
        next(error)
    }
}

export const deletePosts = async (req, res, next) => {
    if(req.user.id !== req.params.userId || !req.user.isAdmin){
        return next(errorHandler(401, " you can not delete the post "))
    }
    
    try {

        await Post.findByIdAndDelete(req.params.postId)
        
        res.status(200).json("post deleted successfully")
    } 
    
    catch (error) {
        next(error)
    }
}

export const updatePost = async (req, res, next) => {
    
    if(req.user.id !== req.params.userId || !req.user.isAdmin){
        return next(errorHandler(401, " you can not update the post "))
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set:{
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                }
            },
            {new: true}
        )

        res.status(200).json(updatedPost)
    } catch (error) {
        next(error)
    }
}