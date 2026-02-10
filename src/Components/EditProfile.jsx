import { useState } from 'react'
import UserCard from './UserCard'
import {BASE_URL} from '../utils/constants'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addUser} from '../utils/userSlice'

const EditProfile = ({user}) => {

    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState(user.age);
    const [photoURL,setPhotoURL] = useState(user.photoURL);
    const [gender,setGender] = useState(user.gender);
    const [about,setAbout] = useState(user.about);
    const [error,setError] =useState("");
    const [showToast,setShowToast]=useState(false);
    const dispatch = useDispatch();

    const saveProfile = async()=>{
        try{
            setError("");
            const res = await axios.patch(BASE_URL+"/profile/edit",{
                firstName,lastName,age,gender,about,photoURL
            },{withCredentials:true});
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false);
            },2000);
        }
        catch(err){
            setError(err.response?.data);
        }
    }

    return (
        <>
        <div className='min-h-screen flex items-center justify-center bg-slate-800 text-slate-100'>
            <UserCard user={{firstName,lastName,age,gender,about,photoURL}}/>
            <div className='mx-10'>
                <div className="card card-border bg-slate-900 border border-slate-700 w-80 shadow-xl">
                <div className="card-body p-0.5">
                    <h2 className="card-title justify-center text-indigo-400 my-2">Edit Pofile</h2>
                    <div className='p-4'>  
                    <fieldset className="fieldset p-2">
                        <legend className="fieldset-legend text-slate-400">Firstname</legend>
                        <input 
                        type="text" 
                        value={firstName}
                        className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        placeholder="Type here"
                        onChange={(e)=>setFirstName(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset p-2">
                        <legend className="fieldset-legend text-slate-400">Lastname</legend>
                        <input 
                        type="text" 
                        value={lastName}
                        className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        placeholder="Type here"
                        onChange={(e)=>setLastName(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset p-2">
                        <legend className="fieldset-legend text-slate-400">Age</legend>
                        <input 
                        type="text" 
                        value={age}
                        className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        placeholder="Type here"
                        onChange={(e)=>setAge(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset p-2">
                    <legend className="fieldset-legend text-slate-400">Gender</legend>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="select bg-slate-700 border-slate-90 focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
                        className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        placeholder="Type here"
                        onChange={(e)=>setPhotoURL(e.target.value)} 
                        />
                    </fieldset>
                    <fieldset className="fieldset p-2">
                        <legend className="fieldset-legend text-slate-400">About</legend>
                        <input 
                        type="string" 
                        value={about}
                        className="input bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        placeholder="Type here"
                        onChange={(e)=>setAbout(e.target.value)} 
                        />
                    </fieldset>
                    </div>
                    <p className='text-red-600 mx-23'>{error}</p>
                    <div className="card-actions justify-center p-3">
                    <button onClick={saveProfile} className="btn bg-indigo-500 hover:bg-indigo-600 text-white border-none">
                    Save Profile
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        {showToast && <div className="toast toast-top toast-center my-5 -mx-7 ">
        <div className="alert alert-success">
            <span>Profile Saved Successfully!</span>
        </div>
        </div>}
        </>
    )
}

export default EditProfile;