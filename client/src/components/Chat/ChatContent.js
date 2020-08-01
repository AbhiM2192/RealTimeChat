import React from 'react';
import styled from 'styled-components';

function ChatContent({message:{user,text},name}) {
    let currentUser = false;    
    const trimmedName = name.trim().toLowerCase();

    const CurrentDiv = styled.div`
    background-color:blue;
    color:white;
    `;
    const CurrentUser = styled.p``;
    const CurrentText = styled.p``;

    const OtherDiv = styled.div``;
    const OtherUser = styled.p``;
    const OtherText = styled.p``;
    if(user === name){
        currentUser = true;
    }
    return (
        currentUser ? 
        (
            <CurrentDiv>
                <CurrentUser>{user}{currentUser}</CurrentUser>
                <CurrentText>{text}</CurrentText>
            </CurrentDiv>
        ):(
            <OtherDiv>
                <OtherUser>{user}</OtherUser>
                <OtherText>{text}</OtherText>
            </OtherDiv>
        )
    )
}

export default ChatContent
