import React from 'react';
import styled from 'styled-components';

const CardMessage = ({ message }) => {

    const convertFromStringToDate = (responseDate) => {
        const hora = new Date(responseDate).toLocaleTimeString()
        return hora
    }

    return (
        <Card>
                <h2>{message.user.userName}</h2>
                <h3>{message.message}</h3>
            <h5>{convertFromStringToDate(message.createdAt)}</h5>
        </Card>
    );
};

export default CardMessage;

const Card = styled.div`
  background-color: #F3F2DA;
    border-radius: 5px;
    height: 45px;
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 2px;

        >h2{
            font-size: 0.6rem;
            color: #0C9463;
        }

        >h3{
            font-size: 0.7rem;
            padding-left: 10px;
        }
    

    >h5{
        font-size: 0.5rem;
        text-align: end;
        color: #FF6337;
    }
`
