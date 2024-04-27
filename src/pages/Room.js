import React,{useCallback, useEffect,useState} from "react";
import { useSocket } from "../providers/Socket";
import ReactPlayer from 'react-player'


const RoomPage =()=>{
const {socket}=useSocket();
const [remoteSocketId,setRemoteId] = useState(null)
const [myStream,setMyStream] = useState(null)

const handleUserJoined=useCallback(({email,id})=>{
    console.log(`Email ${email} joined room`);
    setRemoteId(id);
},[])

const handleCallUser =useCallback(async()=>{

    //To see what is navigator
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then((stream) => {
      
        setMyStream(stream);
    })
    .catch((error) => {
      console.error("Error accessing media device:", error);
      // Handle error, display a message to the user
    });

},[])

useEffect(()=>{
    socket.on("user:joined",handleUserJoined)

    return ()=>{
        socket.off("user:joined",handleUserJoined)
    }
},[socket,handleUserJoined])

    return (
        <>
        <h1>Room Page</h1>
        <h4>{remoteSocketId? 'Connected ':'No one in room'}</h4>
        {remoteSocketId?(<button onClick={handleCallUser}>Call</button>):""}
        {
            myStream &&  <ReactPlayer playing muted={true} height="400px" width="400px" url={myStream}/>
        }
        </>
    )
}

export default RoomPage;