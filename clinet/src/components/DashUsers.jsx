import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostLists from './PostLists'
import UserList from './userList'

const DashUsers = () => {
    //states 
    const { currentUser } = useSelector((state) => state.user)

    const [userInfo, setUserInfo] = useState(null)

    const [userErr, setUserErr] = useState(null)

    const [showMore, setShowMore] = useState(true)

    //funcs
    const fetchPosts = async () => {
        try {
            setUserErr(null)
            const res = await fetch(`/api/user/get-users?limit=13`,
                {
                    method: "GET",
                }
            )

            const data = await res.json()

            if (res.ok) {
                setUserInfo(data)
            }



        } catch (error) {
            setUserErr(error.message)
        }

    }


    useEffect(() => {
        fetchPosts()
    }, [currentUser._id])

    const handleShowMore = async () => {
        const startIndex = userInfo?.users.length

        const res = await fetch(`/api/user/get-users?startIndex=${startIndex}`, {
            method: "GET",
        })

        const data = await res.json()

        setUserInfo((prev) => ({
            users: [...prev.users, ...data.users]
        }))

        if (data.users.length < 9) {
            setShowMore(false)
        }

    }
    return (
        <div className=' w-full table-auto overflow-x-scroll sm:overflow-x-hidden md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {/* render posts */}

            {
                currentUser.isAdmin && userInfo?.users.length > 0 ? (
                    <>

                        <Table hoverable className='shadow-md'>
                            {/* render head of table  */}
                            <Table.Head>
                                <Table.HeadCell>Date created</Table.HeadCell>
                                <Table.HeadCell>User image</Table.HeadCell>
                                <Table.HeadCell>Username</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Admin</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                            </Table.Head >

                            {/* render posts */}

                            <UserList userInfo={userInfo} setUserInfo={setUserInfo} userErr={userErr} />

                        </Table>

                    </>
                ) :
                    (
                        <h1 className='text-center text-3xl font-bold'>No Posts</h1>
                    )
            }
            {
                showMore && userInfo?.users.length >= 9 && <button onClick={handleShowMore} className='btn btn-primary w-full mt-2'>Show More</button>
            }
        </div>
    )
}

export default DashUsers