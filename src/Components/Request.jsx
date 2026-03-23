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
        <div  className='text-center flex flex-col items-center w-full pb-20'>
            <h1 className='text-3xl font-bold my-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>Requests</h1>

            {requests.map((request)=>{
                const {_id,firstName,lastName,photoURL,age,gender,about}=request.fromUserId;

                return(
                    <div key={_id} className='w-[40rem] max-w-[90vw] mx-auto flex items-center justify-between m-3 p-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1'>
                        <div className='flex items-center flex-1'>
                            <div><img alt="photo" className='w-20 h-20 rounded-full object-cover shadow-md ring-2 ring-indigo-500/50' src={photoURL}/></div>
                            <div className='ml-5 text-left flex-1'>
                                <h2 className='font-semibold text-xl text-slate-100'>{firstName + " " + lastName}</h2>
                                {age && gender && <p className='text-sm text-indigo-300 mt-1'>{age+ ", "+ gender}</p>}
                                <p className='text-sm text-slate-400 mt-2 truncate max-w-sm'>{about}</p>
                            </div>
                        </div>
                        <div className='flex gap-3 ml-4'>
                            <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 border-none text-white shadow-lg shadow-indigo-500/30 rounded-xl px-5 hover:scale-105 transition-all duration-300" onClick={()=> handleRequest("accepted",request._id)}>Accept</button>
                            <button className="btn bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 border-none text-white shadow-lg shadow-rose-500/30 rounded-xl px-5 hover:scale-105 transition-all duration-300" onClick={()=>handleRequest("rejected",request._id)}>Reject</button>
                        </div>
                    </div>
                );
            })}
        </div>


    )
}

export default Request;