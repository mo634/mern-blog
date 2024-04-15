import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TotalSection from './TotalSection'
import { Button, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import TableDashboard from './TableDashboard'
const DashboardComp = () => {

    //states 


    const { currentUser } = useSelector((state) => state.user)

    const [users, setUsers] = useState([])

    const [totalUser, setTotalUser] = useState(0)

    const [lastMonthUser, setLastMonthUser] = useState(0)


    const [comments, setComments] = useState([])

    const [lastMonthComments, setLastMonthComments] = useState(0)

    const [totalComments, setTotalComments] = useState(0)

    const [posts, setPosts] = useState(0)

    const [lastMonthPosts, setLastMonthPosts] = useState(0)

    const [totalPosts, setTotalPosts] = useState(0)

    //funcs 

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/user/get-users?limit=5")

            const data = await res.json()



            if (res.ok) {
                setUsers(data.users)
                setTotalUser(data.totalUser)
                setLastMonthUser(data.lastMonthUsers)
            }
        } catch (error) {
            console.log(error.message)
        }


    }
    const fetchComments = async () => {
        try {
            const res = await fetch("/api/comment/get-comments?limit=5")

            const data = await res.json()


            if (res.ok) {
                setComments(data.comments)
                setTotalComments(data.totalComments)
                setLastMonthComments(data.lastMonthComments)
            }
        } catch (error) {
            console.log(error.message)
        }


    }
    const fetchposts = async () => {
        try {
            const res = await fetch("/api/post/get-posts?limit=5",
                {
                    method: "POST"
                })

            const data = await res.json()

            console.log(data)

            if (res.ok) {
                setPosts(data.posts)
                setTotalPosts(data.totalPosts)
                setLastMonthPosts(data.lastMonthPosts)
            }
        } catch (error) {
            console.log(error.message)
        }


    }



    useEffect(() => {
        if (currentUser?.isAdmin) {
            fetchUsers()
            fetchComments()
            fetchposts()
        }
    }, [currentUser])
    console.log(comments)
    return (
        <div className='p-3 md:mx-auto'>

            {/* total section */}
            <div className=' m-5 flex flex-col md:flex-row flex-wrap gap-4'>
                <TotalSection totalInfo={totalUser} totalName="users" icon={"userIcon"} lastMonthInfo={lastMonthUser} />
                <TotalSection totalInfo={totalComments} totalName="comments" icon={"commentIcon"} lastMonthInfo={lastMonthComments} />
                <TotalSection totalInfo={totalPosts} totalName="posts" icon={"postIcon"} lastMonthInfo={lastMonthPosts} />
            </div>


            {/* table section  */}

            <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
            
            <TableDashboard recentInfo={users} tableName="users" header= {["user image ","username"]}/>
            <TableDashboard recentInfo={comments} tableName="comments" header= {["comment content ","likes"]}/>


            </div>
        </div >
    )
}

export default DashboardComp