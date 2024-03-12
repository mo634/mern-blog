import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostLists from './PostLists'
import UserList from './userList'
import CommentsList from './CommentsList'

const DashComments = () => {
    //states 
    const { currentUser } = useSelector((state) => state.user)

    const [commentsInfo, setCommentsInfo] = useState(null)

    const [commentsErr, setCommentsErr] = useState(null)

    const [showMore, setShowMore] = useState(true)

    //funcs
    const fetchComments = async () => {
        try {
            setCommentsErr(null)

            const res = await fetch(`/api/comment/get-comments`,
                {
                    method: "GET",
                }
            )

            const data = await res.json()

            if (res.ok) {
                
                setCommentsInfo(data.comments)
            }



        } catch (error) {
            setCommentsErr(error.message)
        }

    }


    useEffect(() => {
        fetchComments()
    }, [commentsInfo])

    const handleShowMore = async () => {
        const startIndex = commentsInfo?.length

        const res = await fetch(`/api/comment/get-comments?startIndex=${startIndex}`, {
            method: "GET",
        })

        const data = await res.json()

        setCommentsInfo((prev) => ({
            comments: [...prev.comments, ...data.comments]
        }))

        if (data.comments.length < 9) {
            setShowMore(false)
        }

    }
    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {/* render posts */}

            {
                currentUser.isAdmin && commentsInfo?.length > 0 ? (
                    <>

                        <Table hoverable className='shadow-md'>
                            {/* render head of table  */}
                            <Table.Head>
                                <Table.HeadCell>Date updated</Table.HeadCell>
                                <Table.HeadCell>Comment content</Table.HeadCell>
                                <Table.HeadCell>Number of likes</Table.HeadCell>
                                <Table.HeadCell>PostId</Table.HeadCell>
                                <Table.HeadCell>UserId</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                            </Table.Head >

                            {/* render posts */}

                            <CommentsList commentsInfo={commentsInfo} setCommentsInfo={setCommentsInfo} commentsErr={commentsErr} />

                        </Table>

                    </>
                ) :
                    (
                        <h1 className='text-center text-3xl font-bold'>No Comments</h1>
                    )
            }
            {
                showMore && commentsInfo?.length >= 9 && <button onClick={handleShowMore} className='btn btn-primary w-full mt-2'>Show More</button>
            }
        </div>
    )
}

export default DashComments