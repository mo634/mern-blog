import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import Logo from '../components/Logo'
import OAuth from '../components/OAuth'
const SignUp = () => {
  // states

  const [FormData,setFormDate] = useState({})

  const [error ,setError] = useState(null)

  const [loading ,setLoading ] = useState(false)

  const navigate= useNavigate()

  //functions

  const handleSubmit =async (e) => {

    e.preventDefault() 

    try {
      setError(null)
      setLoading(true)

      const res = await fetch("/api/auth/sign-up",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(FormData)
      })
  
  
      const data = await res.json()
  
      // if data failed
      if(data.success == false){
        setLoading(false)
        setError(data.message)
      }

      //if data success

      setLoading(false)

      if(res.ok){
        console.log("first")
      navigate("/sign-in")
      }


    } catch (error) {
      setError(error.message)
        setLoading(false)
    }
    
  }
  const habdleChange = (e) => {

    setFormDate({...FormData,[e.target.id]:e.target.value})
  }

  return (
    <div className='min-h-screen flex mt-20  p-[3%]'>

      {/* parent */}
      <div className='md:flex-row flex-col max-w-3xl  h-fit flex gap-1 mx-auto'>
        {/* left side */}

        <div className='flex justify-center flex-col flex-1'>

          {/* logo */}
          <Logo/>

          <p className='txt-media mt-3 text-gray-500'>
            This is a demo project. You can sign up with your email and password or with Google.</p>

        </div>


        {/* right side */}

        <div className="flex-1">
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="">
              <Label value="your username" />
              <TextInput id='username' type="text" placeholder="Enter your username" onChange={habdleChange} />
            </div>

            <div className="">
              <Label value="your email" />
              <TextInput id='email' type="text" placeholder="Enter your email"  onChange={habdleChange} />
            </div>

            <div >
              <Label value="your password" />
              <TextInput id='password' type="password" placeholder="Enter your password" onChange={habdleChange}  />
            </div>

            <div className='mt-2 flex gap-2 flex-col'>
            <Button  gradientDuoTone='purpleToPink'
              type='submit' className='w-full' disabled={loading} >
                {
                  loading ?
                  <>
                  <Spinner/>
                  </>:
                  "Sign Up"
                }

              </Button>

              <OAuth/>

            </div>

            <div className="">
              <p className='txt-media mt-3 text-gray-500'>Already have an account? 
              <Link className=' text-[#0079ff]' to={"/sign-in"}>Sign In</Link>
              </p>
            </div>

          </form>

          {/* showing errors */}
          {
          error && (
            <Alert color="red" className='mt-1'>{error}</Alert>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp