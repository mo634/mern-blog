import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {HiArrowSmRight, HiDocumentText, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
const SideBar = () => {
    // states 
    const location = useLocation() 

    const {currentUser} = useSelector((state)=>state.user)

    const dispatch = useDispatch()

    const [tab, setTab] = useState("")

    // funcs
    const handleSignout = async () => { 
        
        
        try {
            const res = await fetch("/api/user/signout",{
                method:"GET"
            })

            const data = await res.json() 

            if(res.ok){
                dispatch(signoutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(() => {
        // get tab value from URL

        const urlParams = new URLSearchParams(location.search)

        const tabParam = urlParams.get("tab")

        setTab(tabParam)

    },[location.search])
return (
    <Sidebar className=' h-auto md:h-screen w-full md:w-[20%]' >
        
        <Sidebar.Items>

            <Sidebar.ItemGroup>

                {/* render profile item */}

                <Link to={"?tab=profile"}>
                <Sidebar.Item 
                label="profile"
                icon={HiUser}
                active = {tab==="profile"} 
                className='cursor-pointer'
                as="div"
                >
                    profile
                </Sidebar.Item>

                    {/* render posts item */}
                </Link>

                {currentUser.isAdmin &&(<Link to={"?tab=posts"}>
                <Sidebar.Item 
                label="profile"
                icon={HiDocumentText}
                active = {tab==="posts"} 
                className='cursor-pointer'
                as="div"
                >
                    posts
                </Sidebar.Item>

                </Link>)
}
                {/* render signOut item */}

                <Sidebar.Item 
                icon={HiArrowSmRight}
                className='cursor-pointer'
                onClick={handleSignout}
                >
                    signout
                </Sidebar.Item>
            
            </Sidebar.ItemGroup>
        
        </Sidebar.Items>
    </Sidebar>
)
}

export default SideBar