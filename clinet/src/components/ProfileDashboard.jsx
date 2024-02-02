import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ProfileDashboard = () => {
    //states
    const { currentUser } = useSelector((state) => state.user)

    const [imageFile, setImageFile] = useState(null)

    const [imageFileUrl, setImageFileUrl] = useState(null)

    const [imageFileProgress, setImageFileProgress] = useState(null)

    const [imageFileError, setImageFileError] = useState(null)

    const imageRef = useRef(null)

    // funcs

    const handleChange = (e) => {

        const file = e.target.files[0]

        // convert file image to local URL 

        if (file) {
            setImageFile(file)

            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage()
        }
    }, [imageFile])

    const uploadImage = () => {

        setImageFileError(null)

        // start implement the firebase functionallity

        // get storage 

        const storage = getStorage(app)

        // set file name 

        const fileName = new Date().getTime() + imageFile.name

        // put the filename and storage on firebase 

        const storageRef = ref(storage, fileName)

        // track the progress of uplaoding 

        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on("state_changed", (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress)
            setImageFileProgress(progress)

        },
            // fetch error while uplaoding 
            (err) => {
                setImageFileError("Something went wrong while uploading image ")
                setImageFileProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            }

            ,

            // return final URL 

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                })
            }


        )
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='m-3 font-bold txt-media text-center'>Profile</h1>

            <form className='flex flex-col gap-3'>

                {/* input to upload img */}
                <input type="file" accept='image/*' hidden onChange={handleChange} ref={imageRef} />

                {/* img part */}

                <div
                    onClick={() => imageRef.current.click()}
                    className=" cursor-pointer relative self-center  h-32 w-32 rounded-full shadow-md  overflow-hidden">

                    {/* add circular progress bar */}

                    {
                        imageFileProgress &&
                        (
                            <CircularProgressbar className={`${imageFileProgress === 100 && 'hidden'}`} value={imageFileProgress} text={`${imageFileProgress.toFixed(0)}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                    },
                                    path: {
                                        stroke: `rgba(62, 152, 199, ${imageFileProgress / 100
                                            })`,
                                    },
                                }}
                            />
                        )
                    }

                    <img src={imageFileUrl || currentUser.googlePhotoUrl} alt="user img" 
                    className={`object-cover border-8 border-[lightgray] rounded-full h-full w-full 
                    ${ imageFileProgress &&
                        imageFileProgress < 100 &&
                        'opacity-60'}`} />

                    {/* if error happen while uploading  */}

                </div>
                {
                    imageFileError && <Alert color="failure" className='my-3'>{imageFileError}</Alert>
                }

                {/* text inputs */}

                <TextInput type='text' placeholder='username' id='username' defaultValue={currentUser.username} />
                <TextInput type='text' placeholder='email' id='email' defaultValue={currentUser.email} />
                <TextInput type='password' placeholder='password' id='password' />

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
