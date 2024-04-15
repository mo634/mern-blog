import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import {signInSuccess} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    //states
    const dispatch= useDispatch()

    const navigate = useNavigate()

    const auth = getAuth(app)
    //funcs
    const handleGoogleSignIn = async () => {
        // init the provider 
        const provider = new GoogleAuthProvider()

        try {
            // sign in with popup
            const resultFromGoogle = await signInWithPopup(auth, provider)

            console.log(resultFromGoogle.user.email )

            // send result info to backend 

            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
                ,
                body: JSON.stringify({ 
                    
                    name: resultFromGoogle.user.displayName,
                    
                    email: resultFromGoogle.user.email,

                    googlePhotoUrl: resultFromGoogle.user.photoURL

                })
            })

            const data = await res.json()

            console.log(data)

            //if res success 

            if(res.ok){
                // send result of google to state redux to use globally
                dispatch(signInSuccess(data))

                navigate("/")
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (

        <Button
            gradientDuoTone='purpleToPink'
            className='w-full' outline
            onClick={handleGoogleSignIn}
        >

            <AiFillGoogleCircle className='w-6 h-6 mr-2' />

            Continue with google

        </Button>
    )
}

export default OAuth