import { Alert, Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActionToCall } from '../components/ActionToCall'
import CommentSection from '../components/CommentSection'

const Post = () => {
    //states 
    const { slug } = useParams()

    const [post, setPost] = useState(null)

    const [err, setErr] = useState(null)

    const [loading, setLoading] = useState(false)


    //funcs

    const fetchPost = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/post/get-posts?slug=${slug}`,
                {
                    method: "POST",
                }
            )

            const data = await res.json()


            if (res.ok) {
                setPost(data.posts[0])
                setLoading(false)
                setErr(null)
            }

        } catch (error) {
            setErr(error.message)
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchPost()
    }, [slug])


    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        )
    }

    else if (err) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Alert color="failure">{
                    err
                }</Alert>
            </div>
        )
    }


    else {
        return (
            <main className='max-w-4xl mx-auto p-[3%] flex flex-col gap-5'>
                {/* render title  */}
                <h1 className='text-3xl font-bold text-center'>{post?.title}</h1>

                {/* render category btn  */}

                <Button color='gray' pill size='xs' className='w-fit mx-auto'>{post?.category}</Button>

                {/* render image  */}

                <img src={post?.image} alt={post?.title} className='w-full h-96 object-cover' />

                {/* render data created  */}

                <div className="flex justify-between">
                    <p className=''>{new Date(post?.createdAt).toLocaleDateString()}</p>

                    {/* render min to read */}

                    <p className=''>{(post?.content.length / 1000).toFixed()} min to read</p>

                </div>

                <hr />
                {/* render content  */}

                <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{ __html: post?.content }}></div>

                {/* render action to call component */}

                <div className=" max-w-4xl mx-auto w-full">

                    <ActionToCall />
                </div>

                {/* render comment section */}

                <CommentSection postId={post?._id}/>
                
            </main>
        )
    }
}

export default Post