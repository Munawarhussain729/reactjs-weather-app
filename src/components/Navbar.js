import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className='bg-gray text-white'>
                <div className='flex justify-between px-5 py-2' >
                    <div className='flex items-center gap-2 '>
                        <img src={logo} alt='logo not found' className='w-20 h-20 rounded-full' />
                        <h1 className='text-2xl font-bold'>Weather Forcast</h1>
                    </div>
                    <div className='flex gap-10 h-20 items-center pr-10 text-2xl'>
                        <Link to='/'>Home</Link>
                        <Link to='/search'>Search</Link>
                        <Link to='/forcast'>Forcast</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar