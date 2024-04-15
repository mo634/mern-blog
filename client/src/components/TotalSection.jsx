import React from 'react'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
const TotalSection = ({ totalInfo, icon, totalName, lastMonthInfo }) => {
    return (
        <div className='flex justify-between p-2 gap-4 dark:bg-slate-800 rounded-md shadow-md md:w-72 '>
            <div className=" flex flex-col gap-2">
                <p
                    className='capitalize text-2xl text-gray-500'
                >total {totalName}</p>

                <span className=' font-bold text-3xl'>{totalInfo}</span>

                <p className="flex items-center gap-1">
                    <HiArrowNarrowUp className='text-teal-500'/><span
                    className='text-teal-500 mr-2'>{lastMonthInfo}</span> last month
                </p>
            </div>

            {
                icon === "userIcon"?
                <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                :
                icon === "commentIcon" ?  
                <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                :
                icon === "postIcon" ?
                <HiDocumentText className='bg-violet-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                :
                null
            }
        </div>
    )
}

export default TotalSection