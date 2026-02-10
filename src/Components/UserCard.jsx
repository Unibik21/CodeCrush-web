/* eslint-disable no-unused-vars */
import React from 'react'

const UserCard = ({user}) => {

const {firstName,lastName,age,gender,about,photoURL}=user;
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
        <button className="btn btn-primary">Interested</button>
        <button className="btn bg-pink-600">Ignore</button>
        </div>
    </div>
    </div>
  )
}

export default UserCard;