import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
const SideBar = () => {
    // states 
    const location = useLocation() 

    const dispatch = useDispatch()

    const [tab, setTab] = useState("")

    // funcs
    const handleSignout = async () => { 
        
        
        try {
            const res = await fetch("/api/user/signout",{
                method:"POST"
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
    <Sidebar className=' h-screen w-full md:w-[20%]' >
        
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

                </Link>
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