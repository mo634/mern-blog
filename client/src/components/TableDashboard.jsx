import { Button, Table } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const TableDashboard = ({recentInfo,tableName , header}) => {
    return (
        <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center w-[45%]">
            <div className=" w-full">
                <div className="flex justify-between mb-2 items-center">
                    <p>rescent {tableName}</p>

                    <Button gradientDuoTone={"purpleToBlue"} outline>
                        <Link to={`/dashboard?tab=${tableName}`}>
                            see all
                        </Link>
                    </Button>
                </div>
                <Table hoverable>

                    <Table.Head>
                        <Table.HeadCell>
                            {header[0]}
                        </Table.HeadCell>

                        <Table.HeadCell>
                            {header[1]}
                            
                        </Table.HeadCell>

                    </Table.Head>

                    {
                        tableName === "users" ? 
                        recentInfo?.map((user) => (
                            <Table.Body key={user._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img
                                            src={user.googlePhotoUrl}
                                            alt='user'
                                            className='w-10 h-10 rounded-full bg-gray-500'
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{user.username}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))
                        :
                        tableName === "comments" ? 
                        recentInfo?.map((comment) => (
                            <Table.Body key={comment._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {comment.content}
                                    </Table.Cell>
                                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))
                        :null
                        
                    }

                </Table>
            </div>


        </div>
    )
}

export default TableDashboard