import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
function Comments({ comment, isLike, updateComment,onDelete }) {

    //states
    const { currentUser } = useSelector((state) => state.user)
    const [user, setUser] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [editedComment, setEditedComment] = useState(comment.content)



    //funcs 

    const handleEditComment = async () => {
        setIsEdit(true)
        setEditedComment(comment.content)
    }

    const handleSaveEdit = async () => {
        try {
            const res = await fetch(`/api/comment/comment-edit/${comment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
                ,
                body: JSON.stringify({
                    content: editedComment
                })
            })

            const data = await res.json()

            if (res.ok) {
                setIsEdit(false)
                setEditedComment(data.content)
                updateComment(comment, editedComment)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`)

                const data = await res.json()

                if (res.ok) {
                    setUser(data)

                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchUser()
    }, [comment])

    return (
        <div>
            {
                user ? (
                    <div className='flex gap-4 p-2 border-b border-gray-500'>

                        <img src={user.googlePhotoUrl} className='w-10 h-10 rounded-full' />

                        <div className="w-full">

                            <div className="flex gap-2">

                                <p className='text-teal-400 mb-1'>{user.username}</p>

                                <p className='text-sm'>@ {moment(comment.createdAt).fromNow()}</p>

                            </div>

                            {
                                isEdit ?
                                    <div className=''>
                                        <Textarea
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}
                                            className='mb-2'
                                        />
                                        <div className=" flex justify-end gap-4">

                                            <Button
                                                type='button'
                                                size='sm'
                                                gradientDuoTone='purpleToBlue'
                                                onClick={handleSaveEdit}
                                            >
                                                save
                                            </Button>

                                            <Button
                                                type='button'
                                                size='sm'
                                                gradientDuoTone='purpleToBlue'
                                                outline
                                                onClick={() => setIsEdit(false)}
                                            >
                                                cancel
                                            </Button>
                                        </div>
                                    </div>
                                    : <p className='text-gray-400'>{comment.content}</p>
                            }

                            {/* render like section  */}

                            <div className=" flex gap-2 py-4">
                                <button
                                    className={`hover:text-blue-500 duration-300 ${currentUser && comment.likes.includes(currentUser._id) ? "text-blue-500" : "text-gray-400"}`}
                                    onClick={() => isLike(comment._id)}
                                >
                                    <FaThumbsUp />
                                </button>

                                <p>{comment.numberOfLikes} <span>{comment.numberOfLikes > 1 ? "likes" : "like"}</span></p>

                                {
                                    currentUser && (currentUser._id === comment.userId || user.isAdmin)

                                    &&

                                    (
                                        <>
                                            <button
                                                onClick={handleEditComment}
                                                className=' hover:text-[#0097ff] duration-500 text-gray-400'
                                            >Edit</button>

                                            <button
                                                className=' hover:text-[#0097ff] duration-500 text-gray-400'
                                            onClick={() => onDelete(comment._id)}
                                            >
                                                Delete
                                            </button>
                                        </>

                                    )


                                }
                            </div>

                        </div>

                    </div>
                ) : (
                    null
                )
            }

        </div>
    )
}

export default Comments