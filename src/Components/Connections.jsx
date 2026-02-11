import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector(store=>store.connection);
    const dispatch = useDispatch();
    const fetchConnections = async() =>{
        try{
            const res = await axios.get(BASE_URL+"/user/request/recieved",{withCredentials:true});
            const users = res.data.data.map(req => req.fromUserId);
            console.log(users);
            dispatch(addConnections(users));

        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[])

    if(connections.length===0)return ( <h1 className='text-xl'>No Connections</h1>)

    return (
        <div className='text-center justify-center my-10'>
            <h1 className='text-xl font-bold my-10'>Connections</h1>

            {connections.map((connection)=>{
                const {_id,firstName,lastName,photoURL,age,gender,about}=connection;

                return(
                    <div className='w-125 mx-auto  flex items-center m-2 p-2 border border-pink-950 rounded-2xl bg-cyan-950'>
                        <div><img alt="photo" className='w-20 h-20 rounded-full object-cover' src={photoURL}/></div>
                        <div className='ml-5 text-left'>
                            <h2 className='font-semibold text-sm'>{firstName + " " + lastName}</h2>
                            {age && gender && <p className='text-xs text-slate-300'>{age+ ", "+ gender}</p>}
                            <p className='text-xs text-slate-400 truncate max-w-[180px]'>{about}</p>
                        </div>
                    </div>
                );
            })}
        </div>


    )
}

export default Connections;