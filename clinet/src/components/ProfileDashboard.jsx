import { Alert, Button, Modal, Spinner, TextInput } from 'flowbite-react'
import {HiOutlineExclamationCircle } from 'react-icons/hi'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { deleteFaliure, deleteStart, deleteSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';


const ProfileDashboard = () => {
    //states

    const dispatch = useDispatch()

    const { currentUser, loading,error } = useSelector((state) => state.user)

    const [imageFile, setImageFile] = useState(null)

    const [imageFileUrl, setImageFileUrl] = useState(null)

    const [imageFileProgress, setImageFileProgress] = useState(null)

    const [imageFileError, setImageFileError] = useState(null)

    const [formData, setFormData] = useState({})

    const [updateUserError, setUpdateUserError] = useState(null)

    const [udpateSuccess, setUdpateSuccess] = useState(null)

    const imageRef = useRef(null)

    const [showModel, setShowModal] = useState(false)

    // funcs

    const handleDeleteAccount = async() => {
        setShowModal(false)
        try {
            dispatch(deleteStart())

            const res = await fetch(`/api/user/user-delete/${currentUser._id}`, {
                method: "DELETE",
            })

            const data = await res.json() 

            if (res.ok) {
                dispatch(deleteSuccess())
            }
            else{
                dispatch(deleteFaliure(data.message))
            }
        } catch (error) {
            dispatch(deleteFaliure(error.message))
        }
    }
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setUpdateUserError(null)
        setUdpateSuccess(null)

        // if form data is empty not submit 

        if (Object.keys(formData).length === 0) {
            setUpdateUserError("nothing changed ")
            return
        }

        try {
            dispatch(updateStart())

            const res = await fetch(`/api/user/user-update/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            console.log("data", data)

            if (res.ok) {

                setUdpateSuccess("user updated successfully")

                dispatch(updateSuccess(data.user))
            }

            else {
                dispatch(updateFailure(data.message))
            }

        } catch (error) {
            dispatch(updateFailure(error.message))
        }

    }

    const handleChange = (e) => {

        const file = e.target.files[0]

        // convert file image to local URL 

        if (file) {
            setImageFile(file)

            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        dispatch(updateFailure(null))

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

                    setFormData({ ...formData, googlePhotoUrl: downloadURL })
                })
            }


        )
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='m-3 font-bold txt-media text-center'>Profile</h1>

            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>

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
                    ${imageFileProgress &&
                            imageFileProgress < 100 &&
                            'opacity-60'}`} />

                    {/* if error happen while uploading  */}

                </div>
                {
                    imageFileError && <Alert color="failure" className='my-3'>{imageFileError}</Alert>
                }

                {/* text inputs */}

                <TextInput type='text' placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleInputChange} />

                <TextInput type='text' placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleInputChange} />

                <TextInput type='password' placeholder='password' id='password' onChange={handleInputChange} />

                {/* update btn */}

                <Button type='submit' className=' w-full' gradientDuoTone={"purpleToBlue"} outline>
                    {
                        loading ?
                            <>
                                <Spinner />
                            </> :
                            "update"
                    }
                </Button>
            </form>

            {/* delete and sign out */}

            <div className=" text-red-500 flex justify-between mt-3">

                <span className='cursor-pointer'
                onClick={() => setShowModal(true)}

                >
                    Delete an account </span>
                
                <span className='cursor-pointer'>signOut</span>

            </div>

            {/*  renedr Alerts for update  */}
            
            {
                updateUserError && <Alert color="failure" className='my-3'>{updateUserError}</Alert>
            }

            {
                error && <Alert color="failure" className='my-3'>{error}</Alert>
            }

            {
                udpateSuccess && <Alert color="success" className='my-3'>{udpateSuccess}</Alert>
            }

            {/* render popup for delete account  */}
            <Modal
            show={showModel}
            onClose={() => setShowModal(false)}
            size={"md"}
            popup
            >
                
                <Modal.Header/>
                
                <Modal.Body>
                
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                
                <h3 className='font-bold text-center'>are you sure you want to delete your account</h3>

                <div className=" flex justify-center gap-2 m-5">
                    <Button
                    color='failure'
                    onClick={handleDeleteAccount}
                    >
                        yes , delete
                    </Button>

                    <Button
                    color='gray'
                    onClick={()=>setShowModal(false)}
                    >

                        no,cancel
                    
                    </Button>
                </div>
                </Modal.Body>
            
            </Modal>
        </div>
    )
}

export default ProfileDashboard
