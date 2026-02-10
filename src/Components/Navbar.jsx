import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {

  const user = useSelector(store=>store.user);

  return (
    <div className="navbar bg-slate-900 border-b border-slate-700 shadow-sm text-slate-200">
      <div className="flex-1 hover:bg-slate-950">
        <Link to="/" className="btn btn-ghost text-xl text-indigo-400 hover:text-indigo-300 hover:bg-slate-800">
          CodeↃrush
        </Link>
      </div>

      <div className="flex gap-2 mx-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-slate-800"
          >
            {user && <div className="flex w-10 rounded-full ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900">
              <img
                alt="User Avatar"
                src={user.photoURL}
              />
            </div>}
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-slate-800 text-slate-200 rounded-box z-10 mt-3 w-52 p-2 shadow-lg border border-slate-700"
          >
            <li>
              <Link to='/profile' className="hover:bg-slate-700 hover:text-indigo-400">
                Profile
              </Link>
            </li>
            <li>
              <a className="hover:bg-slate-700 hover:text-indigo-400">
                Connections
              </a>
            </li>
            <li>
              <a className="hover:bg-slate-700 hover:text-indigo-400">
                Requests
              </a>
            </li>
            <li>
              <a className="hover:bg-slate-700 hover:text-red-400">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Navbar;