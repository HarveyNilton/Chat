import React from 'react';
import FormRegister from '../components/FormRegister';
import styled from 'styled-components';

const Register = () => {
    return (
        <Section>
            <FormRegister/>
        </Section>
    );
};

export default Register;

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`