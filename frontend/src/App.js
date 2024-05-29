import { Outlet } from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function App() {

  const fetchUserDetails = async() =>{
    const dataResponse = await fetch("http://localhost:8080/api/user-details",{
      method : "get",
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    console.log("data-user",dataApi)
  }
  useEffect (()=>{
    fetchUserDetails()
  },[])
  return (
    <>
      <ToastContainer />
      <Header/>
      <main className='min-h-[calc(100vh-120px)]'>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
