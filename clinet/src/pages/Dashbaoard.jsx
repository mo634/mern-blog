import{ useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from '../components/SideBar'
import ProfileDashboard from '../components/ProfileDashboard'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'
const Dashbaoard = () => {
  
  const location = useLocation()
  
  const [tab , setTab] = useState("")
  
  useEffect(() => {
    // get tab value from URL 

    const urlParams = new URLSearchParams(location.search)

    const tabParam = urlParams.get("tab")

    setTab(tabParam)


  },[location.search])
  
  return (
    <div className=' min-h-screen flex flex-col md:flex-row '>
      {/* render sidebar */}

      <SideBar/>

      {/* render profile dashboard */}

      {
        tab==="profile" && <ProfileDashboard/>
      }

      {/* render posts dashboard */}
      {
        tab==="posts" && <DashPosts/>
      }

      {/* render users dashboard */}
      {
        tab==="users" && <DashUsers/>
      }
    </div>
  )
}

export default Dashbaoard