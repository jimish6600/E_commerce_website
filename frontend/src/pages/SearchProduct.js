import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import VerticalCart from '../components/VerticalCart'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,SetLoading] = useState(false)
    const {fetchUserAddToCart} = useContext(Context);

    
    const fetchProduct = async() =>{
        SetLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
        setData(dataResponse.data)
        SetLoading(false)
    }

    const handleAddCart = async(e,id) =>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    useEffect(() => {
        fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <p className='text-lg text-center'>Loading.....</p>)
        }
        <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

        {
            data.length === 0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
            )
        }
        <div>
        {
            data.length !== 0 && !loading && (
              <VerticalCart loading={loading} data = {data}/>
            )
        }
        </div>
    </div>
  )
}

export default SearchProduct