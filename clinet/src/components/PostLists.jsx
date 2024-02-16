import React, { useState } from 'react'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { useSelector } from 'react-redux'
const PostLists = ({ postsInfo, postErr ,setPostsInfo}) => {
    //states 
    const [showModal, setShowModal] = useState(false)

    const {currentUser} = useSelector((state)=> state.user)

    const [deletePostId,setDeletePostId]= useState(null)

    //funcs 
    const deletePost = async () => {
        setShowModal(false)

        try {
            const res = await fetch(`/api/post/delete-post/${deletePostId}/${currentUser._id}`, {
                method: "DELETE"
            })


            const data = await res.json()

            if(!res.ok){
                console.log(data.message)
            }

            setPostsInfo((prev)=>({
                posts: prev.posts.filter((post)=> post._id !== deletePostId)
            }))


        } catch (error) {
            console.log(error)
        }
        console.log(deletePostId)
    }
    console.log(postsInfo)
    return (
        <>
            {
                postsInfo?.posts ?
                    (

                        <>
                            {
                                postsInfo.posts.map((post) => (
                                        
                                    <>
                                        <Table.Body>
                                            <Table.Row>

                                                {/* date cell  */}
                                                <Table.Cell>
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </Table.Cell>

                                                {/* image cell  */}
                                                <Table.Cell>
                                                    <Link to={`/post/${post.slug}`}>
                                                        <img src={post.image} alt={post.title}
                                                            className='w-20 h-10 object-cover bg-gray-500'
                                                        />
                                                    </Link>
                                                </Table.Cell>

                                                {/* category cell */}
                                                <Table.Cell>
                                                    {post.category}
                                                </Table.Cell>

                                                {/* delete cell  */}

                                                <Table.Cell>
                                                    <span
                                                        onClick={() => {
                                                            setShowModal(true)

                                                            setDeletePostId(post._id)

                                                        }}
                                                        className='font-medium text-red-500 hover:underline cursor-pointer'>
                                                        Delete
                                                    </span>
                                                </Table.Cell>

                                                {/* update cell  */}

                                                <Table.Cell>
                                                    <Link to={`/update-post/${post._id}`}
                                                        className='font-medium text-blue-500 hover:underline cursor-pointer'
                                                    >

                                                        <span
                                                        
                                                        >Edit</span>

                                                    </Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </>
                                ))

                            }
                        </>

                    )


                    :
                    (<p>{postErr}</p>)

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
                            <Button color='failure' onClick={deletePost}>
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

export default PostLists