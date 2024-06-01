import React, { useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCart = ({
    data,
    fetchdata
}) => {

    const [editProduct , setEditProduct] = useState(false);
  return (
    <div className='bg-white p-4 rounded'>
        <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center mx-auto'>
                <img src={data.productImage[0]} alt="" className='object-fill mx-auto h-full'/>
            </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
            <div>
                <div>
                    {
                        displayINRCurrency(data.sellingPrice)
                    }
                </div>
                <div className='w-fit mt-auto ml-auto p-2 bg-green-100 rounded-full hover:bg-green-600 hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdOutlineEdit />
                </div>
            </div>
        </div>
        
        {
            editProduct && (
                <AdminEditProduct onClose={()=>setEditProduct(false)} productData={data} fetchdata={fetchdata}/>
            )
        }
    </div>
  )
}

export default AdminProductCart