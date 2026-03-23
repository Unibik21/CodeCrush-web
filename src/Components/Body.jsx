/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
  const userData = useSelector(store=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async() =>{
    if(userData) return;
    try{
      const user = await axios.get(BASE_URL+"/profile/view",{withCredentials:true,});
      dispatch(addUser(user.data));
    }
    catch(err){
      if(err.response?.status===401){
        navigate("/login");
      }
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-200">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Body