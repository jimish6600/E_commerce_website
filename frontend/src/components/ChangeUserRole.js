import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunction
}) => {
    const [userRole , setUserRole] = useState(role)
    
    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)
        // console.log("role" , e.target.value)
    }

    const updateUserRole = async() =>{
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method: SummaryApi.updateUser.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
                "token" : localStorage.getItem('authToken')
            },
            data : `${localStorage.getItem('authToken')}`,
            body: JSON.stringify({
                userId : userId,
                role : userRole
            })
        })
        
        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
        }
        // console.log(userRole)
        callFunction()
        // console.log("role updated",responseData)
    }
  return (
    <div className='fixed top-0 buttom-0 left-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-40'>
        <div className='bg-white shadow-md w-full max-w-sm p-4 rounded-md'>
            <button className='block ml-auto border scale-105' onClick={onClose}>
                <IoCloseSharp />
            </button>
            <h1 className='pb-7 text-lg font-medium text-center'>Change User Role</h1>

            <p>Name: {name}</p>
            <p className='pb-2'>Email: {email}</p>
            <div className='flex items-center justify-center gap-3'>
                <p>Role : </p>
                <select className='border px-3 py-1' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(el =>{
                            return (
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                    
                </select>
            </div>

            <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-300 mt-2 hover:bg-red-600 hover:scale-110 translate duration-100' onClick={updateUserRole}>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole