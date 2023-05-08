import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createUserThunk } from '../store/slice/user.slice';
import Toast from '../toast/Toast';

const FormRegister = () => {

    const { handleSubmit, register, reset } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [message, setMessage] = useState(null)
    const [tSucces, setTSucces] = useState(false)
    const [tError, setTError] = useState(false)

    const submit = (data) => {
        dispatch(createUserThunk(data,navigate,reset,setMessage,setTSucces,setTError))
    }

    return (
        <Card>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit(submit)} >
                <ContentInput>
                    <input placeholder='username' required type='text' id='userName'
                        {...register('userName')} />
                </ContentInput>
                <button>Submit</button>
            </Form>
            {tSucces && <Toast type='success' message={message}/>}
            {tError && <Toast type='error' message={message}/>}
        </Card>
    );
};

export default FormRegister;

const Card = styled.div`
    background-color: #206A5D;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
    color: white;

    @media (min-width:500px){
        width: 90vmin;
        height: 90vmin;
    }

`

const Form = styled.form`
    display: flex;
    flex-direction: column;

    justify-content: center;
    gap: 20px;
    width: 90%;

    @media (min-width:500px){
        width: 60%;
    }

    >button {
        height: 5vmax;
        border-radius: 30px;
        border: none;
        font-size: 0.9rem;
      
            &:active{
                background: #931A25;
                color: white;
                
            }

            @media (min-width:768px){
                height: 2.5vmax;
            }
    }
   
`
const ContentInput = styled.section`

    >input[type=text]{
        height: 5vmax;
        width: 100%;
        text-align: center;
        border: 1px solid white;
        border-radius: 30px;

        @media (min-width:768px){
            height: 2.5vmax;
        }
    }
`