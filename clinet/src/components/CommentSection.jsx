import { Button, TextInput, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const CommentSection = ({ postId }) => {
    // states
    const currentUser = useSelector((state) => state.user.currentUser)

    const [comment,setCommnet] = useState("")

    console.log(currentUser)
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

            <form className='flex flex-col gap-3 border border-teal-500 p-[2%]'>
                <Textarea
                    placeholder=' Add Comment'

                    rows={5}

                    onChange={(e) => setCommnet(e.target.value)}

                    value={comment}

                    maxLength={200}


                />

                <div className="flex justify-between items-center">
                    <span className='text-gray-400'>{200 - comment?.length} characters remaining</span>

                    <Button gradientDuoTone={"purpleToPink"} outline>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CommentSection