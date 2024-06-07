import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from "../context";

const ProductDetails = () => {
  const [data , setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const params = useParams()
  const [loading , setLoading] = useState(false)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")
  const {fetchUserAddToCart} = useContext(Context);
  const[zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x:0,
    y:0
  })
  const [zoomImage,setZoomImage] = useState(false)
  const navigate = useNavigate()

  const fetchProductDetails = async() =>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json",
        "token" : localStorage.getItem('authToken')
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse.data)
    setActiveImage(dataResponse.data.productImage[0])
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL) =>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    const { left, top, width, height} = e.target.getBoundingClientRect()

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({x,y})
  },[zoomImageCoordinate])

  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }
  return (
    <div className='container mx-auto p-4'>
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseEnter={()=>setZoomImage(true)} onMouseLeave={()=>setZoomImage(false)}/>

            {/* product zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[400px] min-h-[400px] p-1 -right-[410px] top-0 bg-slate-200'>
                  <div className='w-full h-full min-w-[400px] min-h-[400px] mix-blend-multiply'
                    style = {{
                      backgroundImage : `url(${activeImage})`,
                      backgroundRepeat : 'no-repeat',
                      backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}>
                  </div>
                </div>
              )
            }
            
          </div>
          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map(el=>{
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse'>
    
                        </div>
                      )
                    })
                  }
                </div>
              ):(
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((url,index)=>{
                      return(
                        <div className='h-20 w-20 bg-white rounded' key={url}>
                          <img src={url} className='h-full w-full object-scale-down mix-blend-multiply p-1 cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(url)}/>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* Product Details */}
        {
          loading ? (
            <div className='flex flex-col gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse h-6 w-full rounded-full inline-block lg:h-8'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-full '></h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full lg:h-8'></p>

              <div className='text-red-600 flex items-center gap-1 bg-slate-200 h-6 animate-pulse w-full'>
                
              </div>

              <div className='flex items-center gap-2 text-2xl font-medium h-6 lg:h-8 animate-pulse w-full'>
                <p className='text-red-600 bg-slate-200 w-full'></p>
                <p className='line-through text-slate-400 bg-slate-200 w-full'></p>
              </div>

              <div className='flex items-center gap-2 my-2'>
                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
                <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                <p className='h-8 bg-slate-200 rounded animate-pulse w-full lg:h-12'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.category}</p>

                <div className='text-red-600 flex items-center gap-1'>
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStarHalf />
                </div>

                <div className='flex items-center gap-2 text-2xl font-medium'>
                  <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                  <p className='line-through text-slate-400'>{displayINRCurrency(data?.price)}</p>
                </div>

                <div className='flex items-center gap-2 my-2'>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) => handleBuyProduct(e,data._id)}>Buy</button>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] hover:text-red-600 font-medium bg-red-600 hover:bg-white text-white' onClick={(e) => handleAddToCart(e,data._id)}>Add To Cart</button>
                </div>

                <div>
                  <p className='text-slate-600 font-medium my-1'>Description : </p>
                  <p>{data?.description}</p>
                </div>
            </div>
          )
        }
        
      </div>
      {
        data.category && (
        <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
        )
      }
      
    </div>
  )
}

export default ProductDetails