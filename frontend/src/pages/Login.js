import React, { useContext, useState } from "react";
import LoginIcon from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [Eye, setValue] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {fetchUserDetails ,fetchUserAddToCart} = useContext(Context);


  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      localStorage.setItem('authToken', dataApi.data);
      // console.log("token",dataApi.data)
      fetchUserDetails()
      fetchUserAddToCart()
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login">
      <div className="mx=auto container p-4">
        <div className="bg-white p-4 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img
              src={LoginIcon}
              alt="login icon"
              className="rounded-full"
            ></img>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="Email">Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  id="Email"
                  name="email"
                  placeholder="Enter Emial"
                  value={data.email}
                  className="w-full h-full outline-none bg-transparent"
                  required
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password : </label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  type={Eye ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={data.password}
                  className="w-full h-full outline-none bg-transparent"
                  required
                  onChange={handleOnChange}
                />

                <div onClick={(event) => setValue(!Eye)}>
                  <span>{Eye ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                </div>
              </div>
              <Link
                to={"/Forgot-Password"}
                className="block w-fit ml-auto text-blue-600 hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            <button
              className="bg-red-600 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all duration-200 mx-auto block mt-6 hover:bg-red-700"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="my-4">
            {" "}
            Don't have account ?{" "}
            <Link to={"/sign-up"} className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
