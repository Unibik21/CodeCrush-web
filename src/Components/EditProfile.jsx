import { useState } from 'react'
import UserCard from './UserCard'
import {BASE_URL} from '../utils/constants'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addUser} from '../utils/userSlice'
import { useNavigate } from 'react-router-dom';

const EditProfile = ({user}) => {

    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState(user.age || "");
    const [photoURL,setPhotoURL] = useState(user.photoURL);
    const [gender,setGender] = useState(user.gender || "");
    const [about,setAbout] = useState(user.about);
    const [error,setError] =useState("");
    const [showToast,setShowToast]=useState(false);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    
    const saveProfile = async()=>{
        try{
            setError("");
            const res = await axios.patch(BASE_URL+"/profile/edit",{
                firstName,lastName,age,gender,about,photoURL
            },{withCredentials:true});
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(()=>{
                navigate("/");
            },2000);
            
        }
        catch(err){
            setError(err.response?.data);
        }
    }

    return (
        <>
        <div className='w-full min-h-[calc(100vh-80px)] flex flex-wrap items-start justify-center pt-10 gap-10 px-4 mb-20'>
            <UserCard user={{firstName,lastName,age,gender,about,photoURL}}/>
            <div className=''>
                <div className="card card-border bg-white/5 backdrop-blur-2xl border border-white/10 w-96 max-w-[90vw] shadow-2xl shadow-indigo-500/10">
                <div className="card-body p-0.5">
                    <h2 className="card-title justify-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 my-4">Edit Profile</h2>
                    <div className='p-4 pt-0'>  
                    <fieldset className="fieldset p-2">
                        <legend className="fieldset-legend text-slate-400">Firstname</legend>
                        <input 
                        type="text" 
                        value={firstName}
                        className="input bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full" 
                        placeholder="Type here"
                        onChange={(e)=>setFirstName(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset p-2">
                        <legend className="fieldset-legend text-slate-400">Lastname</legend>
                        <input 
                        type="text" 
                        value={lastName}
                        className="input bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full" 
                        placeholder="Type here"
                        onChange={(e)=>setLastName(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset p-2">
                        <legend className="fieldset-legend text-slate-400">Age</legend>
                        <input 
                        type="text" 
                        value={age}
                        className="input bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full" 
                        placeholder="Type here"
                        onChange={(e)=>setAge(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset p-2">
                    <legend className="fieldset-legend text-slate-400">Gender</legend>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="select bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full">
                        <option className='text-white' value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                    </fieldset>
                    <fieldset className="fieldset p-2">
                        <legend className="fieldset-legend text-slate-400">PhotoURL</legend>
                        <input 
                        type="text" 
                        value={photoURL}
                        className="input bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full" 
                        placeholder="Type here"
                        onChange={(e)=>setPhotoURL(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset p-2">
                        <legend className="fieldset-legend text-slate-400">About</legend>
                        <input 
                        type="string" 
                        value={about}
                        className="input bg-slate-900/50 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl w-full" 
                        placeholder="Type here"
                        onChange={(e)=>setAbout(e.target.value)} 
                        />
                    </fieldset>
                    </div>
                    <p className='text-red-500 text-center font-medium my-1 px-4'>{error}</p>
                    <div className="card-actions justify-center p-4">
                    <button onClick={saveProfile} className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-500/30 rounded-xl w-full transition-all duration-300 hover:scale-[1.02] text-lg font-medium">
                    Save Profile
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        {showToast && <div className="toast toast-top toast-end z-50">
        <div className="alert alert-success border border-green-500/30 bg-green-900/30 backdrop-blur-xl text-green-100 shadow-xl rounded-2xl">
            <span>Profile Saved Successfully!</span>
        </div>
        </div>}
        </>
    )
}

export default EditProfile;