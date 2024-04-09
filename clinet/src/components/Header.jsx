import { Avatar, Button, Dropdown, DropdownItem, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { togglemode } from '../redux/theme/themeSlice';
import Logo from './Logo';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';


const Header = () => {
    //states 
    const path = useLocation().pathname

    const {theme} = useSelector((state)=> state.theme)

    const { currentUser } = useSelector(state => state.user)

    const [searchTerm,setSearchTerm] = useState(null)

    const location = useLocation()

    const navigate = useNavigate()



    const dispatch = useDispatch()

    // funcs 

    const handleSubmit = (e) =>{
        e.preventDefault() 

        const urlParams = new URLSearchParams(location.search)

        urlParams.set("searchTerm",searchTerm)

        const searchQuery  = urlParams.toString() 

        navigate(`/search?${searchQuery}`)


    }
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
        const urlParams = new URLSearchParams(location.search)

        const searchTermFromUrl = urlParams.get("searchTerm")

        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
    },[location.search])

    
    console.log(searchTerm)
    return (
        <Navbar className='border-b-2'>
            {/* logo */}

            <Logo className="" />

            {/* search */}

            {/* lg media */}

            <form 
            onSubmit={handleSubmit}
            className="relative hidden md:inline">
                <TextInput
                    type="text"
                    placeholder="Search..."
                    className=''
                    defaultValue={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AiOutlineSearch className="absolute top-0 bottom-0 right-3 my-auto" />
            </form>

            {/* small media */}

            <Button className='w-12 h-10 md:hidden ' color='gray' pill >
                <AiOutlineSearch />
            </Button>




            {/* btns (sing in , sign up ,darkmode ,..) */}
            <div className=' flex gap-2 md:order-2'>
                
                
                <Button className=' w-12 h-10 hidden md:inline' color='gray'
                onClick={()=> dispatch(togglemode())}
                >
                    {
                        theme === "dark" ?<FaMoon /> : <FaSun />
                    }
                </Button>

                {/* render signin or dropdown */}
                {
                    currentUser ?

                        (
                            <Dropdown
                            arrowIcon={false}
                            inline 
                            label={<Avatar alt="User settings" img={currentUser.googlePhotoUrl} rounded/>}
                            >

                                <Dropdown.Header>

                                    <Link to={'/dashboard?tab=profile'}>
                                    <DropdownItem>profile</DropdownItem>
                                    </Link>

                                    <DropdownItem  onClick={handleSignout}>Sign out</DropdownItem>

                                </Dropdown.Header>

                            </Dropdown>
                        )

                        :

                        (
                            <Link to='/sign-in'>
                                <Button gradientDuoTone='purpleToBlue' outline>
                                    Sign in
                                </Button>
                            </Link>
                        )


                }

            </div>

            <NavbarToggle />
            {/* links */}

            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    )
}

export default Header