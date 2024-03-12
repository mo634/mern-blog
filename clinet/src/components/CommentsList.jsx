import React, { useState } from 'react'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { FaCheck, FaTimes } from 'react-icons/fa'
const CommentsList = ({ commentsInfo, setCommentsInfo, commentsErr }) => {
    //states 

    const [showModal, setShowModal] = useState(false)

    const { currentUser } = useSelector((state) => state.user)

    const [deleteCommentsId, setDeleteCommentsId] = useState(null)

    //funcs 
    const deleteComment = async () => {
        setShowModal(false)

        try {

            const res = await fetch(`/api/comment/comment-delete/${deleteCommentsId}`, {
                method: "DELETE"
            })


            const data = await res.json()

            if (!res.ok) {
                console.log(data.message)
            }

            setCommentsInfo((prev) => ({
                comments: prev.comments?.filter((comment) => comment._id !== deleteCommentsId)
            }))


        } catch (error) {
            console.log(error)
        }

    }
    console.log(commentsInfo)
    return (
        <>
            {
                commentsInfo?
                    (

                        <>
                            {
                                commentsInfo?.map((comment) => (

                                    <>
                                        <Table.Body>
                                            <Table.Row>

                                                <Table.Cell>
                                                {new Date(comment.updatedAt).toLocaleDateString()}
                                                </Table.Cell>

                                                <Table.Cell>{comment.content}</Table.Cell>

                                                <Table.Cell>{comment.numberOfLikes}</Table.Cell>

                                                <Table.Cell>{comment.postId}</Table.Cell>

                                                <Table.Cell>{comment.userId}</Table.Cell>



                                                {/* delete cell  */}

                                                <Table.Cell>
                                                    <span
                                                        onClick={() => {
                                                            setShowModal(true)

                                                            setDeleteCommentsId(comment._id)

                                                        }}
                                                        className='font-medium text-red-500 hover:underline cursor-pointer'>
                                                        Delete
                                                    </span>
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </>
                                ))

                            }
                        </>

                    )


                    :
                    (<p>{commentsErr}</p>)

            }
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />

                <Modal.Body>
                    <div className='text-center'>

                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />

                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this post?
                        </h3>

                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={deleteComment}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CommentsList