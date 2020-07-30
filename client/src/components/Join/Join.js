import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Outer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color:#bcbcbc36;
    height:100vh;
`;
const StyledH1 = styled.h1`
color:#00008B;
`;
const Inner =styled.div`
height: 50vh;
display: flex;
flex-direction: column;
justify-content: space-evenly;

  

`;
const Input=styled.input`
border-radius:5px;
-webkit-box-shadow:3px 3px 5px 6px #ccc;  
-moz-box-shadow:3px 3px 5px 6px #ccc; 
box-shadow:3px 3px 5px 6px #ccc;  
width:490px;
border:none;
height:50px;
`;
const StyledLink =styled(Link)`
all:reset;
margin:2px auto;
`;
const StyledButton = styled.button`
    color: white;
    width: 150px;
    background-color: white;
    height: 50px;
    border-radius: 10px;
    background-color: #2854d2;
    font-size: 20px;
    cursor: pointer;
`;
function Join() {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    return (
        <Outer>
            <StyledH1>Join</StyledH1>
            <Inner> 
                <Input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></Input>
                <Input type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)}></Input>
                <StyledLink to={`/chat?name=${name}&room=${room}`} onClick={(e) => (!name || !room) ? e.preventDefault() : null}>
                    <StyledButton type='submit'>Sign In</StyledButton>
                </StyledLink>
            </Inner>
        </Outer>
    )
}

export default Join
