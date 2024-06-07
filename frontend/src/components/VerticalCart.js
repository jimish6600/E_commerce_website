import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { Link } from 'react-router-dom';

const VerticalCart = ({loading,data = []}) => {
    const loadingList = new Array(12).fill(null);
    const {fetchUserAddToCart} = useContext(Context);

    const handleAddCart = async(e,id) =>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }
  return (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-scroll scrollbar-none transition-all">
    
    {
        loading ? (
            loadingList.map((product) => {
                return (
                  <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow">
                    <div className="bg-slate-200 h-48 p-4 mix-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                      
                    </div>
                    <div className="p-3 w-full grid">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-200 p-1 animate-pulse rounded-full py-2">
                      </h2>
                      <p className="capitalize  text-slate-50 bg-slate-200 p-1 animate-pulse rounded-full mt-1">
                      </p>
                      <div className="flex gap-3 my-2">
                        <p className="text-red-600 font-medium bg-slate-200 p-1 animate-pulse rounded-full w-full py-2">
                        </p>
                        <p className="text-slate-500 line-through bg-slate-200 p-1 animate-pulse rounded-full w-full py-2"></p>
                      </div>
                      <button className="text-white px-3 bg-slate-200 p-1 animate-pulse rounded-full py-2">
                        
                      </button>
                    </div>
                  </div>
                );
              })
        ) : (
            data.map((product) => {
                return (
                  <Link to={"/product/"+product._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow" onClick={scrollTop}>
                    <div className="bg-slate-200 h-48 p-4 mix-w-[120px] md:min-w-[145px] flex justify-center items-center">
                      <img
                        src={product.productImage[0]}
                        alt=""
                        className="object-scale-down h-full hover:scale-110"
                      />
                    </div>
                    <div className="p-3">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                        {" "}
                        {product?.productName}{" "}
                      </h2>
                      <p className="capitalize  text-slate-500">
                        {product?.category}
                      </p>
                      <div className="flex gap-3 my-2">
                        <p className="text-red-600 font-medium">
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 line-through">
                          {displayINRCurrency(product?.price)}
                        </p>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 rounded-full py-0.5"onClick={(e)=>handleAddCart(e,product._id)}>
                        {" "}
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                );
              })
        )
    }
    
  </div>
  )
}

export default VerticalCart