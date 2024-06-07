import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(12).fill(null);
  const {fetchUserAddToCart} = useContext(Context);

  const handleAddCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () =>{
    scrollElement.current.scrollLeft -=300
  }
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
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
                      <Link to={"product/"+product._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow">
                        <div className="bg-slate-200 h-48 p-4 mix-w-[120px] md:min-w-[145px] flex justify-center items-center">
                          <img
                            src={product.productImage[0]}
                            alt=""
                            className="object-scale-down h-full hover:scale-110 mix-blend-multiply"
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
                          <button className="bg-red-600 hover:bg-red-700 text-white px-3 rounded-full py-0.5"onClick={(e) =>handleAddCart(e,product?._id)}>
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
    </div>
  );
};

export default VerticalCardProduct;
