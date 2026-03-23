import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
    const connections = useSelector(store=>store.connection);
    const dispatch = useDispatch();

    const fetchConnections = async() =>{
        try{
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            console.log(res.data.data);
            dispatch(addConnections(res.data.data));

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[]);
    
    if(!connections) return;
    if(connections.length===0)return ( <h1 className='text-xl text-center my-10'>No Connections</h1>)

    return (
        <div  className='text-center flex flex-col items-center w-full pb-20'>
            <h1 className='text-3xl font-bold my-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400'>Connections</h1>

            {connections.map((connection)=>{
                const {_id,firstName,lastName,photoURL,age,gender,about}=connection;

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
                        <div className='ml-4'>
                            <Link to={"/chat/"+_id}><button className='btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 border-none text-white shadow-lg shadow-indigo-500/30 rounded-xl px-6 hover:scale-105 transition-all duration-300'>Chat</button></Link>
                        </div>
                    </div>
                );
            })}
        </div>


    )
}

export default Connections;