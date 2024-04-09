import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({className}) => {
    return (

        <Link to="/"  className={`whitespace-nowrap txt-media ${className} mb-3`}>
            <span className='txt-media main-gradient rounded-lg text-white py-1 px-2 mr-1'>mohamed's</span>
            <span className='txt-media sm:text-xl'>blog</span>
        </Link>

    )
}

export default Logo