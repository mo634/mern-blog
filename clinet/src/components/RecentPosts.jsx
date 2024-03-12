import React from 'react'
import { Link } from 'react-router-dom'
const RecentPosts = ({ post }) => {
    return (
        <div className=' rounded-lg  relative group border border-teal-500 p-2 h-[400px] overflow-hidden transition-all w-full sm:w-[460px]'>

            <Link to={`/post/${post.slug}`}>
                <img src={post.image} alt="post image"
                    className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-500
                    '
                />
            </Link>

            <div className="">
                <p className='line-clamp-3'>{post.title}</p>
                <p>{post.category}</p>
                <Link to={`/post/${post.slug}`}
                className=' left-2 right-2 absolute border border-teal-500  hover:bg-teal-500 bottom-[-40px] group-hover:bottom-2 transition-all duration-500 text-center text-white font-bold py-2'
                >
                read article
                </Link>
            </div>
        </div>
    )
}

export default RecentPosts