import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { MdOutlineEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import SummaryApi from '../common';

const AllUsers = () => {
    const [allUsers,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails , setUpdateUserDetails] = useState({
        name : "",
        email : "",
        role : "",
       _id : ""
    })

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(SummaryApi.allUsers.url,{
            method : SummaryApi.allUsers.method,
            credentials : 'include'
        })
        
        const dataResponse = await fetchData.json()
        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }
        // console.log("jimish" , allUsers,dataResponse.data)
        
    }
    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div className='bg-white p-4'>
        <table className='w-full usertable'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUsers.map((el,index)=>{
                        return (
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).fromNow()}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white'
                                    onClick={() => {
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)
                                    }}
                                    >
                                        <MdOutlineEdit />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
                {
                    openUpdateRole && (
                        <ChangeUserRole onClose={() => setOpenUpdateRole(false)} 
                        name={updateUserDetails.name}
                        email = {updateUserDetails.email}
                        role = {updateUserDetails.role}
                        userId = {updateUserDetails._id}
                        callFunction = {fetchAllUsers}
                        />
                    )
                }

        
    </div>
  )
}

export default AllUsers