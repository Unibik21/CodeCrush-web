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
    console.log(err.message);
  }
}

const {_id,firstName,lastName,age,gender,about,photoURL}=user;
  return (
    <div className="card rounded-3xl bg-slate-900 w-96 shadow-sm">
    <figure className="px-10 pt-10">
        <img
        src={photoURL}
        alt="Shoes"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName+" "+lastName}</h2>
        {age && gender && <p>{age + ", "+gender}</p>}
        <p>{about}</p>
        <div className="card-actions my-5">
        <button className="btn btn-primary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
        <button className="btn bg-pink-600" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
        </div>
    </div>
    </div>
  )
}

export default UserCard;