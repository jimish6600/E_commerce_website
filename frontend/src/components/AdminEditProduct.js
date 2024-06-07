import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from "react-toastify";

const AdminEditProduct = ({
  onClose,
  productData,
  fetchdata
}) => {
  const [data,setData] = useState({
    ...productData,
    productName : productData?.productName,
    brandName : productData?.brandName,
    category : productData?.category,
    productImage : productData?.productImage || [],
    description : productData?.description,
    price : productData?.price,
    sellingPrice : productData?.sellingPrice
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")
  const handleOnChange = (e) =>{
    const {name , value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleUploadProduct = async(e) =>{
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve)=>{
      return {
        ...preve,
        productImage : [...preve.productImage,uploadImageCloudinary.url]
      }
    })
  }

  const handleDeleteProductImage = async(index) =>{
    const newproductImage = [...data.productImage]
    newproductImage.splice(index,1)
    setData((preve)=>{
      return {
        ...preve,
        productImage : newproductImage
      }
    })
  }

  // Upload product
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    const response = await fetch(SummaryApi.updateProduct.url,{
      method : SummaryApi.updateProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json",
        "token" : localStorage.getItem('authToken')
      },
      body : JSON.stringify(data)
    })
    const responseData = await response.json()
    if(responseData.success){
      toast.success(responseData.message)
      fetchdata()
    }else{
      toast.error(responseData.message)
    }
    onClose()
  }

  return (
    <div className='fixed w-full h-full bg-slate-200 top-0 lef-0 right-0 bottom-0 flex justify-center items-center bg-opacity-40'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className='w-fit border text-2xl hover:bg-red-600 cursor-pointer' onClick={onClose}>
            <IoCloseSharp/>
          </div>
        </div>
        
        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>

          <label htmlFor='productName' className='top-3'>Product Name : </label>
          <input type="text" 
          id="productName" 
          placeholder='Enter product name' 
          name= "productName"
          value={data.productName} 
          className='p-2 bg-slate-100 border rounded'
          required
          onChange={handleOnChange}/>

          <label htmlFor='brandName' className='top-3'>Brand Name : </label>
          <input type="text" 
          id="brandName" 
          name = "brandName"
          placeholder='Enter brand name' 
          value={data.brandName} 
          className='p-2 bg-slate-100 border rounded'
          required
          onChange={handleOnChange}/>

          <label htmlFor='category' className='top-3'>Category : </label>
          <select value={data.category} className='p-2 bg-slate-100 border rounded' name ='category' onChange={handleOnChange} required>
            <option value={""} key={-1}>Select Category</option>
            {
              productCategory.map((el,index)=>{
                return (
                  <option value={el.value} key= {el.value+index}>{el.label}</option>
                )
              })
            }
          </select>

          <label htmlFor='productImage' className='top-3'>Product Image : </label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                  <span className='text-4xl'>
                    <FaCloudUploadAlt />
                  </span>
                  <p className='text-sm'>Uploade Product Image</p>
                  <input type="file" name="" id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                </div>
            </div>
          </label>
          <div>
            {
              data?.productImage[0] ? (
                <div className='flex items-center gap-2 cursor-pointer'>
                  {
                    data.productImage.map((el,index)=>{
                      return(
                        <div className='relative group'>
                          <img src={el} 
                          alt='el' 
                          width={80} 
                          height={80} 
                          className='bg-slate-100 border' 
                          onClick={()=>{
                            setOpenFullScreenImage(true)
                            setFullScreenImage(el)
                          }}/>

                          <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                            <MdDelete />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
              )
            }
              
          </div>
          <div className='flex justify-between'>
            <div>
              <label htmlFor='price' className='top-3'>Price : </label>
              <input type="number" 
              id="price" 
              placeholder='Enter product price' 
              name= "price"
              value={data.price} 
              className='p-2 bg-slate-100 border rounded'
              required
              onChange={handleOnChange}/>
            </div>
            <div>
              <label htmlFor='sellingPrice' className='top-3'>Selling Price: </label>
              <input type="number" 
              id="sellingPrice" 
              placeholder='Enter product price' 
              name= "sellingPrice"
              value={data.sellingPrice} 
              className='p-2 bg-slate-100 border rounded'
              required
              onChange={handleOnChange}/>
            </div>
            
          </div>

          <label htmlFor='description' className='top-3'>Description : </label>
          <textarea className='h-28 bg-slate-100 border resize-none p-1' row={3} placeholder='Enter product description' name = "description" value={data.description}  onChange={handleOnChange} required>
          </textarea>

          <button className='px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700'>Update Product</button>
        </form>
      </div>

      {/* display image full screen */}
      {
        openFullScreenImage &&(
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
      }
    </div>
  )
}

export default AdminEditProduct