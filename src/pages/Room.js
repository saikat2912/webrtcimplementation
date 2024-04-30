import React,{useCallback, useEffect,useState} from "react";
import { useSocket } from "../providers/Socket";
import ReactPlayer from 'react-player'
import Peer from "../Services/Peer";


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
    const offer= await Peer.getOffer;
    socket.emit("user:call",{to:remoteSocketId,offer})
   setMyStream(stream);
   
   

},[])

const handleIncommingCall =useCallback(async({from,offer})=>{
    setRemoteId(from)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    setMyStream(stream)
    console.log("In comming call from ",from,offer)
    const ans= await Peer.getAswer(offer)
    socket.emit("call:accepted",{to:from,ans})
},[])

const handleCallAccepted=useCallback(({}))

useEffect(()=>{
    socket.on("user:joined",handleUserJoined)
    socket.on("incoming:call",handleIncommingCall)
    socket.on("call:accepted",handleCallAccepted)
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
            myStream && <ReactPlayer playing muted={true} height="400px" width="400px" url={myStream}/>
        }
        </>
    )
}

export default RoomPage;