/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {

  const user = useSelector(store=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout= async()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      return navigate("/login");
    }
    catch(err){
      console.log("ERROR : "+err.message);
    }
  }

  return (
    <div className="navbar sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10 shadow-xl text-slate-200 px-4">
      <div className="flex-1">
        <Link to="/" className="btn hover:bg-white/5 hover:scale-105 transition-all duration-300 btn-ghost text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          CodeↃrush
        </Link>
      </div>

      {user && <div className="flex gap-2 mx-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-white/5"
          >
            <div className="flex w-10 rounded-full ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/30">
              <img
                alt="User Avatar"
                src={user.photoURL}
              />
            </div>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content backdrop-blur-2xl bg-slate-900/90 text-slate-200 rounded-2xl z-10 mt-4 w-52 p-3 shadow-2xl shadow-indigo-500/10 border border-white/10 gap-1"
          >
            <li>
              <Link to='/profile' className="hover:bg-white/5 hover:text-indigo-400 rounded-xl transition-colors px-4 py-2">
                Profile
              </Link>
            </li>
            <li>
              <Link to='/connections' className="hover:bg-white/5 hover:text-indigo-400 rounded-xl transition-colors px-4 py-2">
                Connections
              </Link>
            </li>
            <li>
              <Link to='/request' className="hover:bg-white/5 hover:text-indigo-400 rounded-xl transition-colors px-4 py-2">
                Requests
              </Link>
            </li>
            <div className="divider my-0 border-white/10"></div>
            <li>
              <a onClick={handleLogout} className="hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition-colors px-4 py-2">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  )
}


export default Navbar;