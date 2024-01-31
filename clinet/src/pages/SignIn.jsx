import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import Logo from '../components/Logo'
import { useDispatch, useSelector } from 'react-redux' 
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'
const SignIn = () => {
  // states

  const [FormData,setFormDate] = useState({})

  const navigate= useNavigate()

  const dispatch = useDispatch()

  const {loading,error,currentUser} = useSelector(state=>state.user)

  //functions

  const handleSubmit =async (e) => {

    e.preventDefault() 

    try {

      dispatch(signInStart())

      const res = await fetch("/api/auth/sign-in",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(FormData)
      })
  
  
      const data = await res.json()
  
      // if data failed
      if(data.success == false){
        dispatch(signInFailure(data.message))
      }

      //if data success

      dispatch(signInSuccess(data.user))

      // redirect
      if(res.ok){
      navigate("/")
      }


    } catch (error) {
      dispatch(signInFailure(error.message))
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
              <Label value="your email" />
              <TextInput id='email' type="text" placeholder="Enter your email"  onChange={habdleChange} />
            </div>

            <div >
              <Label value="your password" />
              <TextInput id='password' type="password" placeholder="*******" onChange={habdleChange}  />
            </div>

            <div className='mt-2 flex gap-2 flex-col'>
            <Button  gradientDuoTone='purpleToPink'
              type='submit' className='w-full' disabled={loading} >
                {
                  loading ?
                  <>
                  <Spinner/>
                  </>:
                  "Sign In"
                }

              </Button>

              <OAuth/>

            </div>

            <div className="">
              <p className='txt-media mt-3 text-gray-500'>Don't have an account ? 
              <Link className=' text-[#0079ff]' to={"/sign-up"}>Sign Up</Link>
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

export default SignIn