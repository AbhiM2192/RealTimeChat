import React from 'react';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';

const CurrentDiv = styled.div`
    background-color:blue;
    color:white;
    transform: translateX(370px);
    max-width: 50vw;
    font-size: 1.2rem;
    padding: 5px 15px;
    border-radius: 30px;
    border: 1px solid blue;
    margin: 10px;
    `;
    const CurrentUser = styled.p`
    font-weight: bold;
    font-style: italic;
    `;
    const CurrentText = styled.p``;

    const OtherDiv = styled.div`
    font-size: 1.2rem;
    background-color: darkgrey;
    padding: 5px 15px;
    border-radius: 30px;
    max-width: 50vw;
    border: 1px solid darkgrey;
    transform: translateX(40px);
    margin: 10px;
    `;
    
    const OtherText = styled.p``;
function ChatContent({message:{user,text},name}) {
    let currentUser = false;    
    //const trimmedName = name.trim().toLowerCase();
    //console.log(user,name)
    if(user === name.toLowerCase()){
        currentUser = true;
    }
    return (
        currentUser ? 
        (
            <CurrentDiv>
                <CurrentUser>{user} :</CurrentUser>
                <CurrentText>{ReactEmoji.emojify(text)}</CurrentText>
            </CurrentDiv>
        ):(
            <OtherDiv>
                <CurrentUser>{user} :</CurrentUser>
                <OtherText>{ReactEmoji.emojify(text)}</OtherText>
            </OtherDiv>
        )
    )
}

export default ChatContent
