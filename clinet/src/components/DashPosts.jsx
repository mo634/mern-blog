import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostLists from './PostLists'

const DashPosts = () => {
    //states 
    const { currentUser } = useSelector((state) => state.user)

    const [postsInfo, setPostsInfo] = useState(null)

    const [postErr, setPostErr] = useState(null)

    const [showMore, setShowMore] = useState(true)

    //funcs
    const fetchPosts = async () => {
        try {
            setPostErr(null)
            const res = await fetch(`/api/post/get-posts/?userId=${currentUser._id}`,
                {
                    method: "POST",
                }
            )

            const data = await res.json()

            if (res.ok) {
                setPostsInfo(data)
            }



        } catch (error) {
            setPostErr(error.message)
        }

    }


    useEffect(() => {
        fetchPosts()
    }, [currentUser._id])

    const handleShowMore = async() => {
        const startIndex = postsInfo?.posts.length

        const res = await fetch(`/api/post/get-posts?userId=${currentUser._id}&startIndex=${startIndex}`, {
            method: "POST",
        })

        const data = await res.json()

        setPostsInfo((prev)=>({
            posts: [...prev.posts, ...data.posts]
        }))

        if(data.posts.length<9){
            setShowMore(false)
        }

    }
    return (
        <div className=' w-full table-auto overflow-x-scroll sm:overflow-x-hidden md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {/* render posts */}

            {
                currentUser.isAdmin && postsInfo?.posts.length > 0 ? (
                    <>

                        <Table hoverable className='shadow-md'>
                            {/* render head of table  */}
                            <Table.Head>
                                <Table.HeadCell>Date updated</Table.HeadCell>
                                <Table.HeadCell>Post image</Table.HeadCell>
                                <Table.HeadCell>Post title</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                            </Table.Head >

                            {/* render posts */}

                            <PostLists postsInfo={postsInfo} postErr={postErr} />

                        </Table>

                    </>
                ) :
                    (
                        <h1 className='text-center text-3xl font-bold'>No Posts</h1>
                    )
            }
            {
                showMore&&<button onClick={handleShowMore} className='btn btn-primary w-full mt-2'>Show More</button>
            }
        </div>
    )
}

export default DashPosts