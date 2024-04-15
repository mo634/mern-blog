import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const CreatePost = () => {
    //states 

    const [imageFile, setImageFile] = useState(null)

    const [imageFileError, setImageFileError] = useState(null)

    const [imageFileUrl, setImageFileUrl] = useState(null)

    const [imageFileProgress, setImageFileProgress] = useState(null)

    const [formData, setFormData] = useState({ category: "javascript" })

    const [puplishError, setPublishError] = useState(null)

    const [puplishLoading, setPuplishLoading] = useState(null)

    const [puplishSuccess, setPuplishSuccess] = useState(null)

    const navigate = useNavigate()
    // funcs 
    const hanldeUplaodImage = () => {

        //reset for states 
        setImageFileError(null)
        setImageFileProgress(null)

        if (!imageFile) {
            setImageFileError("Please select an image")
            return
        }

        // if file image uploaded start to upload for firebase 

        const storage = getStorage(app)

        const filename = new Date().getTime() + '-' + imageFile.name

        const storageRef = ref(storage, filename)

        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        // track the progress 

        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

            setImageFileProgress(progress.toFixed())
        },

            // if there error while uploading 

            (error) => {
                setImageFileError(`an error happen while uploading ${error}`)
                setImageFileProgress(null)
            },

            //  if all things allright

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    setFormData({ ...formData, image: downloadURL })

                    setImageFileProgress(null)

                })
            }

        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setPublishError(null)
            setPuplishLoading(true)
            setPuplishSuccess(null)

            const res = await fetch("/api/post/create-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (res.ok) {
                navigate(`/post/${data.slug}`)
                setPuplishLoading(false)
                setPuplishSuccess("Post created successfully")
            }

            if (data.success == false) {
                setPublishError(data.message)
                setPuplishLoading(false)
            }

        } catch (error) {
            setPuplishLoading(false)
            setPublishError(error.message)
        }


    }
    console.log(formData)
    return (
        <section
            className='min-h-screen max-w-3xl mx-auto my-10 p-[3%]' >
            <h1 className='text-center my-5 font-bold txt-media'>Create Post</h1>

            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

                {/* first part  */}
                <div className="flex flex-col md:flex-row gap-4">
                    <TextInput className='flex-1' id="title" onChange={handleChange} />
                    <Select id='category' onChange={handleChange}>
                        <option value={"javascript"}>javascript </option>
                        <option value={"next"}>next </option>
                        <option value={"python"}>Python </option>
                    </Select>
                </div>

                {/* second part  */}

                <div className="
                flex flex-col md:flex-row gap-2
                border-4 border-teal-500 border-dotted p-3">
                    <FileInput
                        className='flex-1'
                        accept='image/*'
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <Button
                        type='button'
                        gradientDuoTone={"purpleToBlue"}
                        size={"md"}
                        outline
                        onClick={hanldeUplaodImage}
                        disabled={false}
                    >

                        {
                            imageFileProgress ?

                                <div className="h-10 w-10">

                                    <CircularProgressbar
                                        value={imageFileProgress}
                                        text={`${imageFileProgress || 0}%`}
                                    />

                                </div>

                                : "Upload Image"
                        }


                    </Button>

                </div>

                {/* render alerts for uploading image  */}
                {
                    imageFileError && <Alert color={"failure"}>{imageFileError}</Alert>
                }

                {/* render uploaded image  */}
                {
                    formData.image && <img src={formData.image} alt="" className="w-full h-72 object-cover" />
                }

                {/* quill part  */}
                <ReactQuill
                    theme='snow'
                    placeholder='Write something...'
                    className='h-72 mb-12'
                    required
                    id='content'
                    onChange={(value) => {
                        setFormData({ ...formData, content: value })
                    }}
                />

                {/* submit btn */}

                <Button
                    type='submit'
                    gradientDuoTone={"purpleToBlue"}
                    className='w-full'
                    disabled={puplishLoading}
                >
                    {
                        puplishLoading ? "Publishing..." : "Publish"
                    }
                </Button>

                {/* render puplish Alerts  */}

                {
                    puplishError && <Alert color={"failure"}>{puplishError}</Alert>
                }

                {
                    puplishSuccess && <Alert color={"success"}>{puplishSuccess}</Alert>
                }


            </form>
        </section>
    )
}

export default CreatePost