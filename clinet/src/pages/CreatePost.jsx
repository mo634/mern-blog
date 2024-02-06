import React from 'react'
import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const CreatePost = () => {
    return (
        <section 
        className='min-h-screen max-w-3xl mx-auto my-10 p-[3%]' >
            <h1 className='text-center my-5 font-bold txt-media'>Create Post</h1>

            <form className='flex flex-col gap-4 '>
                
                {/* first part  */}
                <div className="flex flex-col md:flex-row gap-4">
                    <TextInput className='flex-1' />
                    <Select>
                        <option value={"javascript"}>java script </option>
                        <option value={"javascript"}>java script </option>
                        <option value={"javascript"}>java script </option>
                    </Select>
                </div>

                {/* second part  */}
                <div className="
                flex flex-col md:flex-row gap-2
                border-4 border-teal-500 border-dotted p-3">
                    <FileInput
                    className='flex-1'
                    accept='image/*' />
                    <Button
                        type='button'
                        gradientDuoTone={"purpleToBlue"}
                        size={"md"}
                        outline
                    >Upload Image</Button>
                </div>

                {/* quill part  */}
                <ReactQuill
                    theme='snow'
                    placeholder='Write something...'
                    className='h-72 mb-12'
                    required
                />

                {/* submit btn */}
                
                <Button
                type='submit'
                gradientDuoTone={"purpleToBlue"}
                className='w-full'
                >
                    Puplish
                </Button>


            </form>
        </section>
    )
}

export default CreatePost