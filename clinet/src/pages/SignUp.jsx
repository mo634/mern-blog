import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'
const SignUp = () => {
  return (
    <div className='min-h-screen flex mt-20  p-[3%]'>

      {/* parent */}
      <div className='md:flex-row flex-col max-w-3xl  h-fit flex gap-1 mx-auto'>
        {/* left side */}

        <div className='flex-1'>

          <div className="">
            <span className=' mr-1 main-gradient rounded-md p-2 text-white '>Mohamed's</span>
            <span className='font-bold'>Blog</span>
          </div>

          <p className='txt-media mt-3 text-gray-500'>
            This is a demo project. You can sign up with your email and password or with Google.</p>

        </div>


        {/* right side */}

        <div className="flex-1">
          
          <form>

            <div className="">
              <Label value="your username" />
              <TextInput id='username' type="text" placeholder="Enter your username" className="" />
            </div>

            <div className="">
              <Label value="your email" />
              <TextInput id='email' type="text" placeholder="Enter your email" className="" />
            </div>

            <div className="">
              <Label value="your password" />
              <TextInput id='password' type="text" placeholder="Enter your password" className="" />
            </div>

            <div className='mt-2 flex gap-2 flex-col'>
            <Button  gradientDuoTone='purpleToPink'
              type='submit' className='w-full' >
                
                Sign Up

              </Button>

            <Button  gradientDuoTone='purpleToPink'
              type='submit' className='w-full' outline >
                
                Continue with google

              </Button>
            </div>

            <div className="">
              <p className='txt-media mt-3 text-gray-500'>Already have an account? 
              <Link className=' text-[#0079ff]'>Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp