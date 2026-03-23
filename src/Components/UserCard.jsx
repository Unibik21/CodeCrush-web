/* eslint-disable no-unused-vars */
import axios from 'axios';
import {BASE_URL} from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
const dispatch = useDispatch();

const handleSendRequest =async(status,userId)=>{
  try{
    await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
    dispatch(removeUserFromFeed(userId));
  }
  catch(err){
    console.log(err?.response?.data || err.message);
  }
}

const {_id,firstName,lastName,age,gender,about,photoURL}=user;
  return (
    <div className="card rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-96 shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-300">
    <figure className="px-6 pt-6">
        <img
        src={photoURL}
        alt="User"
        className="rounded-2xl h-80 w-full object-cover shadow-inner ring-1 ring-white/10" />
    </figure>
    <div className="card-body items-center text-center p-6">
        <h2 className="card-title text-2xl font-bold text-slate-100">{firstName+" "+lastName}</h2>
        {age && gender && <p className="text-slate-300 font-medium">{age + ", "+gender}</p>}
        <p className="text-slate-400 leading-relaxed max-w-sm">{about}</p>
        <div className="card-actions my-5 w-full flex gap-4">
        <button className="btn flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white border-none shadow-lg shadow-rose-500/30 rounded-xl hover:scale-105 transition-all duration-300" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
        <button className="btn flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white border-none shadow-lg shadow-indigo-500/30 rounded-xl hover:scale-105 transition-all duration-300" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
        </div>
    </div>
    </div>
  )
}

export default UserCard;