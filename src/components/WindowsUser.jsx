import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const WindowsUser = ({openUser}) => {

    const user = useSelector(state => state.user)
  

    return (
        <Content openUser={openUser}>
            <h3>Online ({user.length}) </h3>
            <ul>
                    {
                        user.map(user => (
                            <li key={user.id}>{user.userName}</li>
                        
                        ))
                       
                    }
                </ul>
        </Content>
    );
};

export default WindowsUser;

const open = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
  
    100% {
        opacity: 1;
        transform: none;
    }
`
const close = keyframes`
    0% {
        opacity: 1;
        transform: none;
    }
  
    100% {
        opacity: 0;
        transform: translateX(-100%);
      
    }
`
  
const Content = styled.div`
    animation: ${(props)=>(props.openUser ? open : close) } 2s;
    animation-fill-mode: ${(props)=>(props.openUser ? 'forwards' : 'both') } ;
    min-height: 100vh;
    width: 80%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 5px 5px 5px 0px lightgray;
   
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 4;
    padding: 20px;

    >h3{
        text-align: center;
    }
`