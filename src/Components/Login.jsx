import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId,setEmailId] = useState("utkarshcha21@gmail.com");
    const [password,setPassword] = useState("Unibik@2004");
    const [error,setError]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogin = async() =>{
        try{
            const res = await axios.post(BASE_URL+"/login",{
                emailId,
                password,
            },{
                withCredentials:true
            });
            dispatch(addUser(res.data));
            return navigate("/");
        }
        catch(err){
            setError(err.response.data);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-900 text-slate-100'>
            <div className="card card-border bg-slate-800 border border-slate-700 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center text-indigo-400">Login</h2>
                <div className='p-4'>  
                <fieldset className="fieldset p-2">
                    <legend className="fieldset-legend text-slate-400">Email ID</legend>
                    <input 
                    type="text" 
                    value={emailId}
                    className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Type here"
                    onChange={(e)=>setEmailId(e.target.value)} 
                    />
                </fieldset>
                <fieldset className="fieldset p-2">
                    <legend className="fieldset-legend text-slate-400">Password</legend>
                    <input 
                    type="text" 
                    value={password}
                    className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Type here" 
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </fieldset>
                </div>
                <p className='text-red-600 text-center'>{error}</p>
                <div className="card-actions justify-center p-3">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white border-none" onClick={handleLogin}>
                Login
                </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login
