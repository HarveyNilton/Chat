import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CardUser = ({users}) => {

    const [color, setColor] = useState()

    useEffect(() => {
        if (users.isConnected) {
            setColor("#14C38E");
        } else{
            setColor("#FF1E1E")
        }

    }, [users])

    return (
        <Li>
           
            <div></div>
            <h3 style={{color: color} }>{users.userName}</h3>
        </Li>
    );
};

export default CardUser;

const Li = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 0.7rem;

    >div{
        width:5px;
        height:5px;
        background: #400D51;
    }
`




