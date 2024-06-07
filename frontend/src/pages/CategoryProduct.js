import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCart from '../components/VerticalCart'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")
    const [sortBy,setSortBy] = useState("")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const fetchData = async() =>{
      setLoading(true)
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          'content-type' : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      // console.log("jimis", dataResponse?.data)
      setData(dataResponse?.data || [])
      setLoading(false)
    }

    const handleSelectCategory = (e) =>{
      const {name , value , checked} = e.target
      setSelectCategory((preve) =>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])
    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map((categoryKeyName) =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }else{
          return null
        }
      }).filter(el=>el)

      setFilterCategoryList(arrayOfCategory)
      const urlFormat = arrayOfCategory.map((el,index)=>{
        if(arrayOfCategory.length-1 === index){
          return `${el}`
        }
        return `${el}&&`
      })
      navigate("/product-category?category="+urlFormat.join(""))
    },[selectCategory])

    const handleOnChangeSortBy= (e) =>{
      const {value} = e.target

      setSortBy(value)
      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }else{
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    } 

    useEffect(()=>{
      
    },[sortBy])
  return (
    <div className='container mx-auto p-4'>
        {/* desktop version */}
        <div className=' hidden lg:grid grid-cols-[200px,1fr]'>
          {/**left side */}
          <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
            {/* Sort by price */}
            <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-800'>Sort by</h3>

              <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-2'>
                  <input type="radio" name="sortBy" id="LH" value={"asc"} onChange={handleOnChangeSortBy} checked={sortBy === 'asc'}/>
                  <label htmlFor='LH'>Price - Low to High</label>
                </div>

                <div className='flex items-center gap-2'>
                  <input type="radio" name="sortBy" id="HL" value={"dsc"} onChange={handleOnChangeSortBy} checked={sortBy === 'dsc'}/>
                  <label htmlFor='HL'>Price - High to Low</label>
                </div>
              </form>
            </div>

            {/* filter by category */}
            <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-800'>Category</h3>

              <form className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((categoryName,index)=>{
                    return (
                      <div className='flex items-center gap-2'>
                        <input type="checkbox" name="category" value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} checked={selectCategory[categoryName?.value]}/>
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>
            </div>

          </div>

          {/**right side (product) */}
          <div className='pl-3'>
            <p className='font-medium text-slate-800 text-lg my-2'>Search Result : {data.length}</p>
            <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                data.length !== 0 && (
                  <VerticalCart loading={loading} data = {data}/>
                )
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default CategoryProduct