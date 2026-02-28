import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
    const [isSignUp,setIsSignUp] = useState(false);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
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
            navigate("/");
        }
        catch(err){
            setError(err.response.data);
            setTimeout(()=>{
                setError("");   
            },3000);
        }
    }
    const handleSignUp = async() =>{
        try{
            const res = await axios.post(BASE_URL+"/signup",{
                firstName,lastName,emailId,password
            },{
                withCredentials:true,
            })
            dispatch(addUser(res.data.data));
            navigate("/profile");
        }
        catch(err){
            setError(err.response.data);
            setTimeout(()=>{
                setError("");   
            },3000);
        
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-900 text-slate-100'>
            <div className="card card-border bg-slate-800 border border-slate-700 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center text-indigo-400">{isSignUp?"Sign Up":"Login"}</h2>
                <div className='p-4'>
                {isSignUp && 
                <>
                <fieldset className="fieldset p-2">
                <legend className="fieldset-legend text-slate-400">First Name</legend>
                <input 
                type="text" 
                value={firstName}
                className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Type here"
                onChange={(e)=>setFirstName(e.target.value)} 
                />
                </fieldset>  
                <fieldset className="fieldset p-2">
                    <legend className="fieldset-legend text-slate-400">Last Name</legend>
                    <input 
                    type="text" 
                    value={lastName}
                    className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Type here"
                    onChange={(e)=>setLastName(e.target.value)} 
                    />
                </fieldset>
                </>
                }
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
                    type="password" 
                    value={password}
                    className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Type here" 
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </fieldset>
                </div>
                <p className='text-red-600 text-center'>{error}</p>
                <div className="card-actions justify-center p-3">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white border-none" onClick={isSignUp?handleSignUp:handleLogin}>
                {isSignUp?"SignUp":"Login"}
                </button>
                </div>
                <p className='text-center cursor-pointer hover:text-indigo-600' onClick={()=> setIsSignUp(!isSignUp)}>{isSignUp?"Already a User? Login":"New to CodeↃrush? SignUp"}</p>
            </div>
            </div>
        </div>
    )
}

export default Login
