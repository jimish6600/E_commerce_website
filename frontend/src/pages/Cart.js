import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([])
    const [loading , setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context?.addToCartProductCount).fill(null)

    const fetchData = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method: SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem('authToken')
            },
        })
        setLoading(false)
        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
        console.log("kuch nahi hai",responseData.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem('authToken')
            },
            body : JSON.stringify({
                _id : id,
                quantity : qty+1
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }
    }

    const decraseQty = async(id,qty) =>{
        if(qty>=2){
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem('authToken')
            },
            body : JSON.stringify({
                _id : id,
                quantity : qty-1
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }}
    }

    const deleteCartProduct = async(id) =>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem('authToken')
            },
            body : JSON.stringify({
                _id : id
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }
    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr) => preve + (curr.quantity * curr.productId.sellingPrice),0)
  return (
    <div className='container mx-auto'>
        <div className='text-center text-4xl text-slate-500'>
            {
                data.length === 0 && !loading && (
                    <p>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 justify-between p-4'>
            {/* view product */}
            <div className='w-full max-w-4xl'>
                {
                    loading ? (
                        loadingCart.map(el=>{
                            return(
                                <div className='w-full bg-slate-200 h-32 my-3 border border-slate-400 animate-pulse rounded'></div>
                            )
                        })
                        
                    ) : (
                        data.map((product,index)=>{
                            return(
                                <div key = {index+"ADD TO CART"} className='w-full bg-white h-32 my-2 border border-slate-400 grid grid-cols-[120px,1fr]'>
                                    <div className='w-32 h-32'>
                                        <img src={product?.productId.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply bg-slate-200'/>
                                    </div>

                                    <div className='px-4 py-2 relative'>
                                        <div className='absolute right-2 text-red-600 rounded-full p-2 border-red-600 border hover:text-white hover:bg-red-600 cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                            <MdDeleteOutline />
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='flex justify-center items-center border border-red-600 text-red-600 w-6 h-6 rounded hover:bg-red-600 hover:text-white'
                                            onClick={()=>decraseQty(product._id,product.quantity)}
                                            >-</button>
                                            <span>{product?.quantity}</span>
                                            <button className='flex justify-center items-center border border-red-600 text-red-600 w-6 h-6 rounded hover:bg-red-600 hover:text-white' 
                                            onClick={()=>increaseQty(product._id,product.quantity)}
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

            {/* summary product */}
            <div className='mt-5 lg:mt-0 w-full max-w-sm my-3'>
                {
                    loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>Total </div>
                    ) : (
                        <div className='h-36 bg-white relative'>
                            <h2 className='text-white bg-red-600 py-1 text-center'>Summary</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Quantity</p>   
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>

                            <button className='bg-blue-600 text-white w-full p-3 absolute bottom-0' >Payment</button>
                        </div>
                    )
                }
            </div>
            
        </div>
    </div>
  )
}

export default Cart