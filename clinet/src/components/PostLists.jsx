import React from 'react'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
const PostLists = ({ postsInfo, postErr }) => {
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
                                                    <span  className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                                                </Table.Cell>

                                                {/* update cell  */}

                                                <Table.Cell>
                                                    <Link to={`/update-post/${post.slug}`}
                                                    className='font-medium text-blue-500 hover:underline cursor-pointer'
                                                    >
                                                        
                                                        <span>update</span>
                                                        
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
        </>
    )
}

export default PostLists