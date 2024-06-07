import React, { useContext, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import SummaryApi from '../common';
import Context from '../context';
import logo from '../assest/logo.png'


const Header = () => {
    const user = useSelector(state => state.user?.user)
    const dispatch = useDispatch()
    const [manuDisplay , setManuDisplay] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLsearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLsearch.getAll("q")
    const [search,setSearch] = useState(searchQuery)

    const handleLogout = async() =>{
        const fetchData = await fetch(SummaryApi.userLogout.url,{
            method : SummaryApi.userLogout.method,
            credentials : 'include',
            headers : {
                "token" : localStorage.getItem('authToken')
            }
        })

        const data = await fetchData.json()

        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }else{
            toast.error(data.message)
        }
    }

    const handleSearchbar = (e) =>{
        const {value} = e.target
        setSearch(value)
        if(value){
            navigate(`/search-product?q=${value}`)
        }else{
            navigate(`/search-product`)
        }
    }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between '>
            <div className=''>
                <Link to={"/"}> 
                    <img width={100} height ={50} src={logo}/>
                </Link>
            </div>

            <div className='hidden lg:flex items-center w-full justify-center max-w-sm border rounded-full focus-within:shadow pl-2'>
                <input type="text" placeholder='search product here....' className='w-full outline-none' onChange={handleSearchbar} value={search}/>
                <div className='text-lg min-w-[45px] bg-red-600 flex items-center justify-center rounded-r-full h-8'>
                    <CiSearch/>
                </div>
            </div>

            <div className='flex items-center gap-3'>
                
                <div className='relative flex justify-center'>
                    {
                        user?._id && (
                            <div className='text-3xl cursor-pointer' onClick={()=>setManuDisplay(preve => !preve)}>
                        {
                            user?.profilePic ? (
                                <img src = {user.profilePic} className='w-10 h-10 rounded-full alt={user.name}'/>
                            ) : (
                                <FaRegUserCircle/> 
                            )
                        }
                    </div>

                    )
                    }
                    
                    {
                        manuDisplay && (
                            
                                    user?.role === ROLE.ADMIN && (
                                        <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded md:block hidden'>
                                        <nav>
                                            <Link to = {"/admin-panel/all-users"} className='whitespace-nowrap hover:bg-slate-100 p-1.5' onClick={()=>setManuDisplay(preve => !preve)}> Admin Panel</Link>
                                        </nav>
                                        </div>
                                    )
                                
                        )
                    }
                    
                </div>

                
                    {
                        user?._id  && (
                            <Link  to= {"cart"} className='text-2xl cursor-pointer relative'>
                                <span><FaShoppingCart/></span>
                                <div className='bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                                    <p className='text-sm'>{context?.addToCartProductCount}</p>
                                </div>
                            </Link>
                        )
                    }
                    
                

                <div>
                    {
                        user?._id ? (
                            <button onClick = {handleLogout} className='ml-3 px-2 py-1 rounded-full bg-red-600'> 
                                Logout
                            </button>
                        ) : (
                            <Link to={'login'}>
                            <button className='ml-3 px-2 py-1 rounded-full bg-red-600'> 
                                Login
                            </button>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header;