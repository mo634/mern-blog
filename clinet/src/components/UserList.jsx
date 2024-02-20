import React, { useState } from 'react'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { FaCheck, FaTimes } from 'react-icons/fa'
const UserList = ({ userInfo, setUserInfo, userErr }) => {
    //states 

    const [showModal, setShowModal] = useState(false)

    const { currentUser } = useSelector((state) => state.user)

    const [deleteUserId, setDeleteUserId] = useState(null)

    //funcs 
    const deletePost = async () => {
        setShowModal(false)

        try {

            const res = await fetch(`/api/user/user-delete/${deleteUserId}`, {
                method: "DELETE"
            })


            const data = await res.json()

            if (!res.ok) {
                console.log(data.message)
            }

            setUserInfo((prev) => ({
                users: prev.users.filter((user) => user._id !== deleteUserId )
            }))


        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            {
                userInfo?.users ?
                    (

                        <>
                            {
                                userInfo.users.map((user) => (

                                    <>
                                        <Table.Body>
                                            <Table.Row>

                                                {/* date cell  */}
                                                <Table.Cell>
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </Table.Cell>

                                                {/* image cell  */}
                                                <Table.Cell>
                                                    <img src={user.googlePhotoUrl} alt="user img"
                                                        className='w-20 h-10 object-cover bg-gray-500'
                                                    />
                                                </Table.Cell>

                                                {/* category cell */}
                                                <Table.Cell>
                                                    {user.username}
                                                </Table.Cell>

                                                {/* email cell */}
                                                <Table.Cell>
                                                    {user.email}
                                                </Table.Cell>

                                                {/* Admin cell */}
                                                <Table.Cell>
                                                    {user.isAdmin ? (
                                                        <FaCheck className='text-green-500' />
                                                    ) : (
                                                        <FaTimes className='text-red-500' />
                                                    )}
                                                </Table.Cell>

                                                {/* delete cell  */}

                                                <Table.Cell>
                                                    <span
                                                        onClick={() => {
                                                            setShowModal(true)

                                                            setDeleteUserId(user._id)

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
                    (<p>{userErr}</p>)

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

export default UserList