import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
  const [categoryProduct,setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const categoryLoading = new Array(12).fill(null)
  
  const fetchCategoryProduct = async() =>{
    setLoading(true)
    const response = await fetch(SummaryApi.categoryProduct.url)
    const dataResponse = await response.json()
    setLoading(false)
    setCategoryProduct(dataResponse.data)
    // console.log("jimsih",dataResponse.data)
  }

  useEffect(()=>{
    fetchCategoryProduct()
  },[])
  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center justify-between overflow-scroll gap-2 scrollbar-none'>
        {
          loading ? (
            
              categoryLoading.map((el,index)=>{
                return (
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 animate-pulse' key={"categoryLoading" + index}>
                  </div>
                )
              })
          ) : (
            categoryProduct.map((product,index)=>{
              return (
                <Link to = {'/product-category?category=' + product?.category} key={product?.category}>
                <div className='cursor-pointer'>
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200'>
                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-fit mx-auto mix-blend-multiply hover:scale-110 transition-all'/>
                  </div>
                  <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                </div>
                </Link>
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default CategoryList