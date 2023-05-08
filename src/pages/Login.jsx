import React from 'react';
import styled from 'styled-components';
import FormLogin from '../components/FormLogin';

const Login = () => {
    return (
        <Section>
            <FormLogin />
        </Section>
    );
};

export default Login;

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`