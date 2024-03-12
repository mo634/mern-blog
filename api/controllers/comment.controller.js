import { errorHandler } from "../utlis/errorHandler.js"
import Comment from "../models/comment.model.js"
export const addComment = async (req, res, next) => {

    const { content, postId, userId } = req.body

    if (userId !== req.user.id) {
        return next(errorHandler(401, "unauthorized user"))
    }
    try {
        const newComment = new Comment({
            content,
            postId,
            userId,
        })

        await newComment.save()

        res.status(200).json(newComment)
    }
    catch (error) {
        next(error)
    }
}

export const getComment = async (req, res, next) => {
    try {

        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1
        })


        res.status(200).json(comments)

    } catch (error) {
        next(error)
    }
}

export const commnetLike = async (req, res, next) => {

    const comments = await Comment.findById(req.params.commentId)

    if (!comments) {
        return next(errorHandler(404, "comment not found"))
    }

    try {
        const isLike = comments.likes.indexOf(req.user.id)

        if (isLike === -1) {
            // user want to like comment 
            comments.likes.push(req.user.id)
            comments.numberOfLikes += 1
        }

        else {

            // user want to unlike comment
            comments.numberOfLikes -= 1
            comments.likes.splice(req.user.id, 1)
        }

        await comments.save()

        res.status(200).json(comments)
    }
    catch (error) {
        next(error)
    }
}

export const commnetEdit = async (req, res, next) => {
    // edit available only by admin and owner 

    const comment = await Comment.findById(req.params.commentId)

    if (req.user.id !== comment.userId && !req.user.isAdmin) {
        return next(errorHandler(401, "unauthorized user"))
    }

    try {

        const editedContent = await Comment.findByIdAndUpdate(req.params.commentId, {
            content: req.body.content
        }, { new: true })

        res.status(200).json(editedContent)
    }
    catch (err) {
        next(err)
    }

}

export const commnetDelete = async (req, res, next) => {
    try {


        const comment = await Comment.findById(req.params.commentId)

        if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
        }

        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to delete this comment'));
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('Comment has been deleted');
    } catch (error) {
        next(error)
    }
}

export const getComments = async (req, res, next) => {
    if (!req.user.isAdmin)
        return next(errorHandler(403, 'You are not allowed to get all comments'));

    try {
        const startIndex = parseInt(req.query.startIndex) || 0

        const limit = parseInt(req.query.limit) || 9

        const sortDirection = req.query.sortDirection === "desc" ? -1 : 1

        const comments = await Comment.find().skip(startIndex).sort({ createdAt: sortDirection }).limit(limit)

        const totalComments = await Comment.countDocuments()

        const now = new Date()

        const onMonthAgo = new Date(

            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        
        const lastMonthComments = await Comment.countDocuments({

            createdAt:{$gte: onMonthAgo}
        })

        res.status(200).json({
            comments,
            totalComments,
            lastMonthComments
        })

    } catch (error) {
        next(error)
    }
}
