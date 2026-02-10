import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
const Body = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200">
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body