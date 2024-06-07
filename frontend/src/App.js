import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import SummaryApi from "./common";

function App() {

  const dispatch = useDispatch()
  const [addToCartProductCount,setAddCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.userDetails.url, {
      method: SummaryApi.userDetails.method,
      credentials: "include",
      headers : {
        "token" : localStorage.getItem('authToken')
      }
    });

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

  }

  const fetchUserAddToCart = async() =>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include',
      headers : {
        "token" : localStorage.getItem('authToken')
      }
    })

    const dataApi = await dataResponse.json()
    setAddCartProductCount(dataApi?.data?.count)
    // console.log("datApi", dataApi?.data?.count)
  }
  useEffect(() => {
    // user details
    fetchUserDetails();
    // user cart product details
    fetchUserAddToCart()
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user Details
          addToCartProductCount, // current user add to cart product count
          fetchUserAddToCart
        }}
      >
        <ToastContainer 
          position="top-center"
        />
        <Header />
        <main className="min-h-[calc(100vh-57px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
