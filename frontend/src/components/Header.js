import React from 'react'
import Logo from './Logo';
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className='h-16 shadow-md bg-white'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between '>
            <div className=''>
                <Link to={"/"}> 
                    <Logo w={100} h ={50}/>
                </Link>
            </div>

            <div className='hidden lg:flex items-center w-full justify-center max-w-sm border rounded-full focus-within:shadow pl-2'>
                <input type="text" placeholder='search product here....' className='w-full outline-none'/>
                <div className='text-lg min-w-[45px] bg-red-600 flex items-center justify-center rounded-r-full h-8'>
                    <CiSearch/>
                </div>
            </div>

            <div className='flex items-center gap-3'>
                <div className='text-3xl cursor-pointer'>
                   <FaRegUserCircle/> 
                </div>

                <div className='text-2xl cursor-pointer relative'>
                    <span><FaShoppingCart/></span>
                    <div className='bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                        <p className='text-sm'>0</p>
                    </div>
                </div>

                <div>
                    <Link to={'login'}>
                    <button className='ml-3 px-2 py-1 rounded-full bg-red-600'> 
                        Login
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header;