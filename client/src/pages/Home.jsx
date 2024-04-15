import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActionToCall } from '../components/ActionToCall'
import RecentPosts from '../components/RecentPosts'
const Home = () => {

  //states 
  const [posts, setPosts] = useState([])

  // funcs 

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/get-posts?limit=9", {
        method: "POST"
      })

      const data = await res.json()


      if (res.ok) {
        setPosts(data.posts)
      }
    }
    fetchPosts()
  }, [])
  console.log(posts)
  return (
    <main className=''>

      {/* top section */}
      <div className=" p-28 px-5 flex flex-col gap-4">
        <h1 className='font-bold text-2xl  md:text-4xl lg:text-6xl'>Welcome to my Blog</h1>
        <p className=' text-gray-500 '>Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages.
        </p>
        <Link 
        to="/search" 
        className='text-teal-500 text-sm font-bold'>View all posts</Link>
      </div>

      {/* call to action section */}
      <div className=" bg-amber-100 dark:bg-slate-700 p-3">
        <ActionToCall />
      </div>

      {/* recent posts */}

      <div className="flex flex-col justify-center items-center gap-4 mx-auto max-w-8xl">
        <p className=' text-center font-bold my-4 capitalize text-2xl'>recent posts </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {
            posts && posts.map(post => <RecentPosts key={post._id} post={post} />)

          }
        </div>

        <Link 
        to="/search" 
        className='text-teal-500 text-sm font-bold mb-2'>View all posts</Link>
      </div>

    </main>
  )
}

export default Home