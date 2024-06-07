import React, { useState } from 'react'
import LoginIcon from '../assest/signin.gif'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64'
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const SignUp = () => {
    const [pass, setpass] = useState(false);
    const [c_pass, setCpass] = useState(false);
    const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : "",
        profilePic: ""
    })
    const navigate = useNavigate()

    const handleOnChange = (e) =>{
        const { name , value }= e.target;

        setData((preve) =>{
            return{
                ...preve,
                [name] : value
            }
        })
        
    }

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)

        setData((preve)=>{
            return{
                ...preve,
                profilePic : imagePic
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.password === data.confirmPassword){
            const dataResponse = await fetch(SummaryApi.signUp.url,{
                method : SummaryApi.signUp.url,
                headers : {
                    "Content-Type" : "application/json",
                    "token" : localStorage.getItem('authToken')
                },
                body : JSON.stringify(data)
            })
            const dataApi  = await dataResponse.json()
            
            if(dataApi.success){
                toast.success(dataApi.message)
                navigate('/login')
            }else{
                toast.error(dataApi.message)
            }
        }else{
            toast.error("Please check password and confirm password")
        }
    }

  return (
    <section id="Sing" className="flex items-center justify-center">
        <div className='mx=auto container p-4'>
            <div className='bg-white p-4 w-full max-w-md mx-auto'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    
                    <div>
                        <img src={data.profilePic || LoginIcon} alt='login icon'/>
                    </div>
                    <form>
                        <label className='cursor-pointer'>
                            <div className='text-xs pt-1 pb-5 text-center bg-slate-100 absolute bottom-0 w-full bg-opacity-80'>
                                Upload Photo
                            </div>
                            <input type="file" className='hidden' onChange={handleUploadPic} required/>
                        </label>
                        
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                    <div className='grid'>
                        <label htmlFor="Name">Name : </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type="text" 
                                id="Name" 
                                name='name'
                                placeholder='Enter your name' 
                                value={data.name}
                                className='w-full h-full outline-none bg-transparent' 
                                required
                                onChange={handleOnChange}/>
                        </div>
                    </div>

                    <div className='grid'>
                        <label htmlFor="Email">Email : </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type="email" 
                                id="Email" 
                                name='email'
                                placeholder='Enter Emial' 
                                value={data.email}
                                className='w-full h-full outline-none bg-transparent' 
                                required
                                onChange={handleOnChange}/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password">Password : </label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                            <input 
                                type={pass ? "text":"password"} 
                                id="password" 
                                name='password'
                                placeholder='Enter Password' 
                                value={data.password}
                                className='w-full h-full outline-none bg-transparent' 
                                required
                                onChange={handleOnChange}/>
                            
                            <div onClick={(event) => setpass(!pass)}>
                                <span>
                                    {pass ? (<FaRegEye/>) : (<FaRegEyeSlash/>)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password : </label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                            <input 
                                type={c_pass ? "text":"password"} 
                                id="confirmPassword" 
                                name='confirmPassword'
                                placeholder='Enter Password' 
                                value={data.confirmPassword}
                                className='w-full h-full outline-none bg-transparent'
                                required 
                                onChange={handleOnChange}/>
                            
                            <div onClick={(event) => setCpass(!c_pass)}>
                                <span>
                                    {c_pass ? (<FaRegEye/>) : (<FaRegEyeSlash/>)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all duration-200 mx-auto block mt-6 hover:bg-red-700' type="submit">Sign Up</button>
                </form>

                <p className='my-4'> Already have account ? <Link to={'/login'} className='text-blue-600 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default SignUp