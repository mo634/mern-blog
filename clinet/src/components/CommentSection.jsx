import { Alert, Button, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Comments from './Comments'
const CommentSection = ({ postId }) => {
    // states
    const currentUser = useSelector((state) => state.user.currentUser)

    const [comment, setCommnet] = useState("")

    const [commentErr, setCommentErr] = useState("")

    const [comments, setComments] = useState([])


    //funcs 

    const updateComment =(comment,editedComment)=>{
        setComments(comments.map((com)=>com._id === comment._id ? {...com, content: editedComment} : com))
    }
    const isLike = async (id) => {

        try {
            const res = await fetch(`/api/comment/comment-like/${id}`,
                {
                    method: "PUT"
                }
            )

            const data = await res.json()


            if (res.ok) {
                // map on all comments 
                //  if the comment user liked is the same in map update likes and numberOfLikes
                setComments(
                    comments.map((com)=>com._id === id ? {
                        ...com,
                        likes: data.likes,
                        numberOfLikes: data.likes.length

                    }: com)
                )
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/comment/add-comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                    content: comment
                    , userId: currentUser._id
                }),
            })


            const data = await res.json()

            if (res.ok) {
                setCommnet("")
                setCommentErr(null)
                setComments([...comments, data])
            }


        } catch (error) {
            setCommentErr(error.message)
        }
    }

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const res = await fetch(`/api/comment/get-comment/${postId}`)

                const data = await res.json()

                if (res.ok) {
                    setComments(data)
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchComment()
    }, [postId])

console.log(comments)
    return (
        <div className=' max-w-xl mx-auto w-full'>

            <div className="my-2 flex items-center gap-3">
                <p className=' text-gray-400'>signed as : </p>
                <img src={currentUser.googlePhotoUrl}
                    className='w-7 h-7 rounded-full'
                    alt="current user " />
                <Link
                    className='text-teal-400 hover:underline'
                    to={"/dashboard?tab=profile"}>{currentUser.username}</Link>
            </div>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-3 border border-teal-500 p-[2%]'>
                <Textarea
                    placeholder=' Add Comment'

                    rows={5}

                    onChange={(e) => setCommnet(e.target.value)}

                    value={comment}

                    maxLength={200}


                />

                <div className="flex justify-between items-center">
                    <span className='text-gray-400'>{200 - comment?.length} characters remaining</span>

                    <Button
                        type='submit'
                        gradientDuoTone={"purpleToPink"} outline>
                        Submit
                    </Button>
                </div>


                {/* render comment erro  */}
                {commentErr && <Alert color="failure" >{commentErr}</Alert>}
            </form>

            {/* render comment */}

            {
                comments.length === 0 ? (
                    <p>no comments</p>
                ) : (

                    <>

                        <p className='my-3'> <span className='bg-teal-400 text-white py-1 px-2 rounded-sm'>{comments.length}</span> comment</p>

                        {
                            comments.map((comment) => (
                                <Comments key={comment._id} comment={comment} isLike={isLike} updateComment={updateComment}/>
                            ))
                        }

                    </>


                )
            }
        </div>
    )
}

export default CommentSection