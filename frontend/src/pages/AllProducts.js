import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCart from '../components/AdminProductCart'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)

  const[allProduct,setallProduct] = useState([])

  const fetchAllProduct = async() =>{
    const  response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    setallProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div>
      <div className='bg-white py-2 px-2 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-red-600 text-red-600 py-2 px-4 rounded-full hover:bg-red-600 hover:text-white transition-all' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/* all product */}
      <div className='flex items-center gap-5 py-4 h-[calc(100vh-195px)] overflow-y-scroll flex-wrap'>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCart data={product} key={index+"allProduct"} fetchdata = {fetchAllProduct}/>
            )
          })
        }
      </div>

      {/* UploadProduct component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchdata = {fetchAllProduct}/>
        )
      }

    </div>
  )
}

export default AllProducts