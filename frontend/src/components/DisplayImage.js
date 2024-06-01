import React from 'react'
import { IoCloseSharp } from "react-icons/io5";

const DisplayImage = ({imgUrl,onClose}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex items-center flex-col justify-center bg-opacity-40 bg-white'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto flex items-center flex-col justify-center p-2'>
            <div className='w-fit border text-2xl hover:bg-red-600 cursor-pointer  ml-auto' onClick={onClose}>
                <IoCloseSharp/>
            </div>
            <div className='flex justify-center p-4 max-h-[60vh] max-w-[60vh]'>
                <img src={imgUrl} className='max-h-[60vh] max-w-[60vh]'/>
            </div>
        </div>
    </div>
  )
}

export default DisplayImage