import React,{useState} from 'react';
import { useSocket } from '../providers/Socket';

const HomePage =()=>{


    const [email,setEmail]= useState("");
    const [room,setRoom]= useState('');
    const {socket}= useSocket();
    const handleJoinRoom =()=>{
        socket.emit("room:join", { email, room });
        console.log("On join room the socket is ",socket)
    }
  
   // socket.emit("room:join",{roomId:1001,email:"saka@hdm.com"})

    return(  
        
        <>
        <div className='home-page-container'>
            <div className='page-elements'>
            <input className='input-elements' value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your email"/>
            <input className='input-elements' type="text" onChange={(e)=>setRoom(e.target.value)} placeholder='Enter your Room Code'/>
            <button onClick={handleJoinRoom}>Enter Room</button>
            </div>
        </div>
        </>
    )
}

export default HomePage;