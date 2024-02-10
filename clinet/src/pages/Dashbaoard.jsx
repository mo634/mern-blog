import{ useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from '../components/SideBar'
import ProfileDashboard from '../components/ProfileDashboard'
import DashPosts from '../components/DashPosts'
const Dashbaoard = () => {
  
  const location = useLocation()
  
  const [tab , setTab] = useState("")
  
  useEffect(() => {
    // get tab value from URL 

    const urlParams = new URLSearchParams(location.search)

    const tabPramam = urlParams.get("tab")

    setTab(tabPramam)


  },[location.search])
  
  return (
    <div className=' min-h-screen flex flex-col md:flex-row '>
      {/* render sidebar */}

      <SideBar/>

      {/* render profile dashboard */}

      {
        tab==="profile" && <ProfileDashboard/>
      }

      {
        tab==="posts" && <DashPosts/>
      }
    </div>
  )
}

export default Dashbaoard