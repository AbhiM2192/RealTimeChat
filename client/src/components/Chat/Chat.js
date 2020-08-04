import React,{useState,useEffect,useRef} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import styled from 'styled-components';

import ChatContent from './ChatContent';

const Outer = styled.div`
    display:flex;
    flex-flow: column;
    border: 10px solid cornflowerblue;
    height: 100vh;
    
`;
const Input = styled.textarea`
    border-radius:5px;
    font-family: cursive;
    height: 10vh;
    width: 70vw;
`;
const Styledh2 = styled.h2`
    height:10vh;
    color: steelblue;
    position: relative;
    font-family: sans-serif;
    margin: 25px auto;
`;
const InputContainer = styled.div`
    display:flex;
    width:100%;
    height: 20vh;
    align-items: flex-end;
    justify-content: space-evenly;
    color: black;
    margin: 25px 0px;
`;
const MessageContainer =styled.div`
    height:50vh;
    overflow:scroll;
`;
const Send = styled.button`
    background-color: blue;
    widht: 5vw;
    height: 5vh;
    width: 10vw;
    border-radius: 10px;
    color: white;
    border-color: blue;
    font-size: 20px;
    align-items: center;
`;
let socket;
function Chat({location}) {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('');
    const ENDPOINT = 'localhost:5000';
    const scrollDiv = useRef();
    useEffect(() =>{
        const {name,room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        socket = io(ENDPOINT);
        //console.log(name,room)
        socket.emit('Join',{name,room},()=>{})

        return () =>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT,location.search]);
    useEffect(() =>{
        socket.on('message',(message) =>{
            setMessages([...messages,message]);
        })
    },[messages]);
    useEffect(() =>{
        scrollDiv.current = document.getElementsByClassName('infiniteScroll')[0].children[0];
    },[]);
    
    useEffect(() =>{
        let scrollInt = setInterval(() =>{
            let diff = scrollDiv.current.scrollHeight - scrollDiv.current.clientHeight;
            let isAtBottom = (diff <= scrollDiv.current.scrollTop) ? false : true;
            
            if(isAtBottom){
                scrollDiv.current.scrollBy({
                    top:106,
                    left:0,
                    behaviour:'smooth'
                })
            }
        },500);

        return () =>{
            clearInterval(scrollInt);
        }
        
    },[])
    

    const sendMessage = (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,() =>setMessage(''))
        }
    }
    //console.log(message,messages);
    const Mess = messages.map((message,i) =><ChatContent key={i} message={message} name={name}/>)
    return (
        <Outer className='outerContainer'>
                <Styledh2>Welcome to Chat Room {room}</Styledh2>
                <div className='infiniteScroll'>
                    <MessageContainer>
                        {Mess}
                    </MessageContainer>
                 </div>
                    <InputContainer>                
                        <Input value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        />
                        <Send onClick={(e) =>sendMessage(e)}>Send</Send>
                    </InputContainer>
                
        </Outer>
    )
}

export default Chat
