import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
function Chat({location}) {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    useEffect(() =>{
        const {name,room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        socket = io(ENDPOINT);
        socket.emit('Join',{name,room},()=>{})

        return () =>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT,location.search])
    return (
        <div>
           Chat 
        </div>
    )
}

export default Chat
