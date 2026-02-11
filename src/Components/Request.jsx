import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeUser } from '../utils/requestSlice';

const Request = () => {
    const requests = useSelector(store=>store.request);
    const dispatch = useDispatch();
    const fetchRequest= async() =>{
        try{
            const res = await axios.get(BASE_URL+"/user/request/recieved",{withCredentials:true});
            console.log(res.data.data);
            dispatch(addRequest(res.data.data))
        }
        catch(err){
            console.log(err.message);
        }
    }
    const handleRequest = async(status,_id) =>{
        try{
            await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
            dispatch(removeUser(_id));
        }
        catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        fetchRequest();
    },[])

  if(requests.length===0)return ( <h1 className='text-xl text-center my-10'>No Requests</h1>)

    return (
        <div className='text-center justify-center my-10'>
            <h1 className='text-xl font-bold my-10'>Requests</h1>

            {requests.map((request)=>{
                const {_id,firstName,lastName,photoURL,age,gender,about}=request.fromUserId;

                return(
                    <div key={_id} className='w-125 mx-auto justify-between flex items-center m-2 p-2 border border-pink-950 rounded-2xl bg-cyan-950'>
                        <div><img alt="photo" className='w-20 h-20 rounded-full object-cover' src={photoURL}/></div>
                        <div className='ml-5 text-left'>
                            <h2 className='font-semibold text-sm'>{firstName + " " + lastName}</h2>
                            {age && gender && <p className='text-xs text-slate-300'>{age+ ", "+ gender}</p>}
                            <p className='text-xs text-slate-400 truncate max-w-[180px]'>{about}</p>
                        </div>
                        <div className=''>
                            <button className="btn btn-primary ml-25" onClick={()=> handleRequest("accepted",request._id)}>Accept</button>
                            <button className="btn btn-secondary mx-3" onClick={()=>handleRequest("rejected",request._id)}>Reject</button>
                        </div>
                    </div>
                );
            })}
        </div>


    )
}

export default Request;