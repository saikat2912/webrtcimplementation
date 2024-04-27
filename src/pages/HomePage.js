import React,{useState,useEffect, useCallback} from 'react';
import { useSocket } from '../providers/Socket';
import { useNavigate } from 'react-router-dom';

const HomePage =()=>{


    const [email,setEmail]= useState("");
    const [room,setRoom]= useState('');
    const {socket}= useSocket();

    const navigate= useNavigate();

    const handleFormSubmit =useCallback((e)=>{
         e.preventDefault();
         socket.emit("room:join",{email,room})
    },[email,room,socket])
    const handleJoinRoom =useCallback((data)=>{
        const {email,room}=data
        navigate(`/room/${room}`)
    },[navigate])
  
    useEffect(()=>{
        socket.on('room:join',handleJoinRoom)


        //Deregister listener
        return ()=>{
            socket.off('room:join',handleJoinRoom)
        }
    },[socket,handleJoinRoom])
   // socket.emit("room:join",{roomId:1001,email:"saka@hdm.com"})

    return(  
        
        <>
        <div className='home-page-container'>
            <div className='page-elements'>
            <form onSubmit={handleFormSubmit}>
            <input className='input-elements' value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your email"/>
            <input className='input-elements' type="text" onChange={(e)=>setRoom(e.target.value)} value={room} placeholder='Enter your Room Code'/>
            <button >Enter Room</button></form>
            </div>
        </div>
        </>
    )
}

export default HomePage;