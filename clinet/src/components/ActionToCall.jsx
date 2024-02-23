import { Button } from 'flowbite-react'
import React from 'react'

export const ActionToCall = () => {
    return (
        <div className='flex  border-teal-500 border p-[2%] rounded-tl-xl rounded-br-xl
        flex-col gap-4 sm:flex-row sm:gap-2
        '>
            
            <div className="flex-1 flex flex-col gap-3 text-center">

            <h1 className='text-xl'>Want to learn HTML, CSS and JavaScript by building fun and engaging projects?</h1>
            <p className='text-gray-500 '>Check our 100 js prjects website and start building your own projects</p>
            <Button className='w-full' gradientDuoTone='purpleToPink'>Get Started</Button>
            </div>

            <img 
            className='flex-1 object-contain'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3iKZpz7xyrBKvSkZe23ljPHZ9p815t4mmug&usqp=CAU" alt="js image" />
        </div>
    )
}
