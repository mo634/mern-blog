import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    //states 
    const path = useLocation().pathname
    return (
        <Navbar className='border-b-2'>
            {/* logo */}

            <Link to="/" className='self-center whitespace-nowrap txt-media'>
                <span className='txt-media bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white py-1 px-2 mr-1'>mohamed's</span>
                <span className='txt-media sm:text-xl'>blog</span>
            </Link>

            {/* search */}

                {/* lg media */}

            <form className="relative hidden md:inline">
                <TextInput
                    type="text"
                    placeholder="Search..."
                    className=''
                />
                <AiOutlineSearch className="absolute top-0 bottom-0 right-3 my-auto" />
            </form>

            {/* small media */}

            <Button className='w-12 h-10 md:hidden ' color='gray' pill >
                <AiOutlineSearch />
            </Button>

            


            {/* btns (sing in , sign up ,darkmode ,..) */}
            <div className=' flex gap-2 md:order-2'>
                <Button className=' w-12 h-10 hidden md:inline' color='gray'>
                    <FaMoon/>
                </Button>
            <Link to='/sign-in'>
                <Button gradientDuoTone='purpleToBlue' outline>
                    Sign in
                </Button>
            </Link>
            </div>

            <NavbarToggle/>
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