/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector(store=>store.feed);
  const dispatch = useDispatch();

  const getFeed = async() =>{
    try{
      if(feed) return;
      const res = await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
      dispatch(addFeed(res?.data));
    }
    catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{getFeed()},[]);

  return (
    (feed && <div className='flex items-center justify-center min-h-screen'>
      <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed