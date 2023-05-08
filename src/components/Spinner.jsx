import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = () => {
    return (
        <Section>
            <LdsDualRings/>
        </Section>
    );
};

export default Spinner;

const Section = styled.section`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    background: rgba(172, 172, 172, 0.404);
    z-index: 9999;
`
const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const LdsDualRings = styled.article`
    display: inline-block;
    width: 80px;
    height: 80px;

    &:after{
        content: " ";
        display: block;
        width: 40px;
        height: 40px;
        margin: 8px;
        border-radius: 50%;
        border: 3px solid rgb(255, 255, 255);
        border-color: #3AB0FF transparent #FC2947 transparent;
        animation: ${rotate} 1.2s linear infinite;
    }
`