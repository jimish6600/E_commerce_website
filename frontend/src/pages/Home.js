import React from 'react'
import CategoryLisy from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryLisy/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
    </div>
  )
}

export default Home