import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
const ProfileDashboard = () => {
    const {currentUser} = useSelector((state)=>state.user)
return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='m-3 font-bold txt-media text-center'>Profile</h1>

        <form className='flex flex-col gap-3'>
            
            {/* img part */}
            
            <div className=" self-center  h-32 w-32 rounded-full shadow-md  overflow-hidden">
            <img src={currentUser.googlePhotoUrl} alt="user img" className='object-cover border-8 border-[lightgray] rounded-full h-full w-full' />
            </div>

            {/* text inputs */}

            <TextInput type='text' placeholder='username' id='username' defaultValue={currentUser.username} />
            <TextInput type='text' placeholder='email' id='email' defaultValue={currentUser.email}  />
            <TextInput type='password' placeholder='password' id='password'  />

            {/* update btn */}

            <Button type='submit' className=' w-full' gradientDuoTone={"purpleToBlue"} outline>
                Update
            </Button>
        </form>

        {/* delete and sign out */}

        <div className=" text-red-500 flex justify-between mt-3">
            
            <span className='cursor-pointer'>Delete</span>
            <span className='cursor-pointer'>signOut</span>

        </div>
    </div>
)
}

export default ProfileDashboard
