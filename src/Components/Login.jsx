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
        <div className='min-h-[calc(100vh-80px)] w-full flex items-center justify-center px-4'>
            <div className="card card-border bg-white/5 backdrop-blur-2xl border border-white/10 w-96 shadow-2xl shadow-indigo-500/10">
            <div className="card-body">
                <h2 className="card-title justify-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 pb-4">{isSignUp?"Sign Up":"Login"}</h2>
                <div className='p-4'>
                {isSignUp && 
                <>
                <fieldset className="fieldset p-2">
                <legend className="fieldset-legend text-slate-400">First Name</legend>
                <input 
                type="text" 
                value={firstName}
                className="input bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full" 
                placeholder="Type here"
                onChange={(e)=>setFirstName(e.target.value)} 
                />
                </fieldset>  
                <fieldset className="fieldset p-2">
                    <legend className="fieldset-legend text-slate-400">Last Name</legend>
                    <input 
                    type="text" 
                    value={lastName}
                    className="input bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full" 
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
                    className="input bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full" 
                    placeholder="Type here"
                    onChange={(e)=>setEmailId(e.target.value)} 
                    />
                </fieldset>
                <fieldset className="fieldset p-2">
                    <legend className="fieldset-legend text-slate-400">Password</legend>
                    <input 
                    type="password" 
                    value={password}
                    className="input bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full" 
                    placeholder="Type here" 
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </fieldset>
                </div>
                <p className='text-red-600 text-center'>{error}</p>
                <div className="card-actions justify-center p-3">
                <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-500/30 rounded-xl w-full transition-all duration-300 hover:scale-[1.02] text-lg font-medium" onClick={isSignUp?handleSignUp:handleLogin}>
                {isSignUp?"Sign Up":"Login"}
                </button>
                </div>
                <p className='text-center cursor-pointer hover:text-indigo-600' onClick={()=> setIsSignUp(!isSignUp)}>{isSignUp?"Already a User? Login":"New to CodeↃrush? SignUp"}</p>
            </div>
            </div>
        </div>
    )
}

export default Login
