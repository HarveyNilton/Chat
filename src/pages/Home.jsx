import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardMessage from '../components/CardMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { creatteMessagesThunk, getAllMessageThunk } from '../store/slice/messages.slice';
import CardUser from '../components/CardUser';
import WindowsUser from '../components/WindowsUser';
import { deleteUserThunk, getAllUsersThunk} from '../store/slice/user.slice';
import { useParams } from 'react-router-dom';

const Home = () => {

    const { handleSubmit, register, reset } = useForm()
    const dispatch = useDispatch()

    const [openUser, setOpenUser] = useState(false);

    useEffect(() => {
        dispatch(getAllMessageThunk())
        dispatch(getAllUsersThunk())
    }, [])

    const messages = useSelector(state => state.messages)

    const user = useSelector(state => state.user)

    const { userName } = useParams()

    const nUsers = user.filter(user => user.userName === userName)

    const submit = (data) => {
        const  datos = {
            message:data.message,
            userId: nUsers[0].id
        }
        dispatch(creatteMessagesThunk(datos))
        reset()
    }

    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('token')
       dispatch(deleteUserThunk(nUsers[0].id))
    })

    const open = () => {
        setOpenUser(!openUser)
    }


    return (
        <Main>
            <ContentChat>
                <ul>
                    {
                        messages.map(message => (
                            <CardMessage key={message.id} message={message} />
                        ))
                    }
                </ul>


                <Form onSubmit={handleSubmit(submit)} >
                    <Article>
                        <textarea required type='textarea' id='message'
                            {...register('message')} />
                    </Article>
                    <button>Enviar</button>
                </Form>
            </ContentChat>
            <ContentConected>
                <h1>Online ({user.length}) </h1>
                <ul>
                    {
                        user.map(user => (
                            <CardUser key={user.id} users={user} />
                        ))

                    }
                </ul>

            </ContentConected>

            <Svg onClick={open} id="Layer_5" enable-background="new 0 0 64 64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g><path d="m40.048 39.826c.613-1.227.952-2.577.952-3.954 0-4.563-3.465-8.331-7.902-8.816l-.065-2.056h6.967v-2.877c0-2.68-1.685-5.031-4.167-5.915l-.287-1.148c.633-.528 1.099-1.239 1.312-2.06h.142c1.654 0 3-1.346 3-3 0-.628-.195-1.21-.527-1.693.341-.873.527-1.809.527-2.747 0-2.514-2.045-4.56-4.559-4.56h-6.882c-2.514 0-4.559 2.046-4.559 4.56 0 .938.186 1.874.527 2.748-.332.482-.527 1.064-.527 1.692 0 1.654 1.346 3 3 3h.142c.213.821.679 1.532 1.312 2.06l-.287 1.148c-2.482.885-4.167 3.235-4.167 5.915v2.877h7.031l.065 2.039c-4.529.395-8.096 4.203-8.096 8.833 0 1.376.339 2.727.952 3.954-3.106 2.459-4.952 6.189-4.952 10.174 0 7.168 5.832 13 13 13s13-5.832 13-13c0-3.985-1.846-7.715-4.952-10.174zm-11.048-27.826v-4.586c0-.228.186-.414.414-.414.109 0 .216.044.293.121 1.211 1.212 2.822 1.879 4.536 1.879h.757v3c0 1.103-.897 2-2 2h-2c-1.103 0-2-.897-2-2zm8-1v-2c.551 0 1 .448 1 1s-.449 1-1 1zm-11-1c0-.552.449-1 1-1v2c-.551 0-1-.448-1-1zm1.042-3h-.042c-.267 0-.522.046-.768.112-.147-.504-.232-1.027-.232-1.552 0-1.412 1.148-2.56 2.559-2.56h6.882c1.411 0 2.559 1.148 2.559 2.56 0 .526-.085 1.048-.231 1.553-.247-.067-.502-.113-.769-.113h-1-1.757c-1.179 0-2.288-.459-3.122-1.294-.45-.448-1.072-.706-1.707-.706-1.189 0-2.174.866-2.372 2zm3.958 9h2c.24 0 .473-.03.701-.071l.29 1.159c-.047 1.061-.918 1.912-1.991 1.912s-1.944-.851-1.991-1.912l.29-1.159c.228.041.461.071.701.071zm-5 6.123c0-1.604.894-3.023 2.256-3.756.561 1.531 2.02 2.633 3.744 2.633s3.183-1.102 3.744-2.633c1.362.733 2.256 2.152 2.256 3.756v.877h-12zm6 38.877c-1.075 0-2.22-1.527-3.009-4h6.018c-.789 2.473-1.934 4-3.009 4zm-3.519-6c-.244-1.209-.408-2.553-.46-4h7.958c-.052 1.447-.217 2.791-.46 4zm-7.43-4h4.971c.046 1.419.184 2.763.409 4h-4.217c-.626-1.221-1.034-2.57-1.163-4zm14.795-3.895c.067.62.104 1.255.128 1.895h-1.233zm-6.587 1.895h-1.233c.023-.64.061-1.275.128-1.895zm-3.232 0h-4.965c.129-1.408.519-2.763 1.151-4h4.234c-.232 1.269-.374 2.62-.42 4zm11.951 2h4.971c-.13 1.43-.537 2.779-1.164 4h-4.217c.226-1.237.365-2.581.41-4zm-.005-2c-.047-1.38-.188-2.731-.42-4h4.234c.633 1.237 1.022 2.592 1.151 4zm2.487-6h-2.219l.823-1.411c.512.43.976.903 1.396 1.411zm-8.588-14h.256c3.789 0 6.872 3.083 6.872 6.872 0 1.216-.324 2.413-.936 3.462l-5.424 9.298c-.265.455-1.016.455-1.28 0l-5.424-9.298c-.612-1.049-.936-2.246-.936-3.462 0-3.789 3.083-6.872 6.872-6.872zm-6.936 12.589.823 1.411h-2.219c.42-.508.884-.981 1.396-1.411zm-1.415 15.411h3.374c.368 1.295.838 2.422 1.391 3.341-1.874-.675-3.518-1.834-4.765-3.341zm12.193 3.341c.553-.919 1.023-2.046 1.391-3.341h3.374c-1.247 1.507-2.891 2.666-4.765 3.341z" /><path d="m32 41c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z" /><path d="m59.858 28h.142c1.654 0 3-1.346 3-3 0-.628-.195-1.21-.527-1.693.341-.873.527-1.809.527-2.747 0-2.514-2.045-4.56-4.559-4.56h-6.882c-2.514 0-4.559 2.046-4.559 4.56 0 .938.186 1.874.527 2.748-.332.482-.527 1.064-.527 1.692 0 1.654 1.346 3 3 3h.142c.213.821.679 1.532 1.312 2.06l-.287 1.148c-2.482.884-4.167 3.235-4.167 5.915v3.877h16v-3.877c0-2.68-1.685-5.03-4.167-5.915l-.287-1.148c.633-.528 1.099-1.239 1.312-2.06zm.142-2v-2c.551 0 1 .448 1 1s-.449 1-1 1zm-11-1c0-.552.449-1 1-1v2c-.551 0-1-.448-1-1zm1.042-3h-.042c-.267 0-.522.046-.768.112-.147-.504-.232-1.027-.232-1.552 0-1.411 1.148-2.56 2.559-2.56h6.882c1.411 0 2.559 1.148 2.559 2.56 0 .526-.085 1.048-.231 1.553-.247-.067-.502-.113-.769-.113h-1-1.757c-1.179 0-2.288-.459-3.122-1.294-.45-.448-1.072-.706-1.707-.706-1.189 0-2.174.866-2.372 2zm7.958 5c0 1.103-.897 2-2 2h-2c-1.103 0-2-.897-2-2v-4.586c0-.228.186-.414.414-.414.109 0 .216.044.293.121 1.211 1.212 2.822 1.879 4.536 1.879h.757zm3 10.123v1.877h-12v-1.877c0-1.75 1.058-3.289 2.634-3.945l3.366 4.489 3.366-4.489c1.576.656 2.634 2.195 2.634 3.945zm-4.085-5.342-1.915 2.552-1.915-2.552.213-.852c.229.041.462.071.702.071h2c.24 0 .473-.03.701-.071z" /><path d="m9 14c-4.411 0-8 3.589-8 8v7c0 1.54.454 3.049 1.283 4.336-.806 1.062-1.283 2.375-1.283 3.787v3.877h16v-3.877c0-1.412-.477-2.725-1.283-3.788.829-1.286 1.283-2.795 1.283-4.335v-7c0-4.411-3.589-8-8-8zm6 25h-12v-1.877c0-1.604.894-3.023 2.256-3.756.561 1.531 2.02 2.633 3.744 2.633s3.183-1.102 3.744-2.633c1.362.733 2.256 2.152 2.256 3.756zm-3-12c0 1.103-.897 2-2 2h-2c-1.103 0-2-.897-2-2v-4.586c0-.228.186-.414.414-.414.109 0 .216.044.293.121 1.211 1.212 2.822 1.879 4.536 1.879h.757zm-4 4h2c.24 0 .473-.03.701-.071l.29 1.159c-.047 1.061-.918 1.912-1.991 1.912s-1.944-.851-1.991-1.912l.29-1.159c.228.041.461.071.701.071zm7-2c0 1.047-.264 2.045-.766 2.935-.432-.293-.895-.547-1.401-.727l-.287-1.148c.881-.735 1.454-1.826 1.454-3.06v-5h-2.757c-1.179 0-2.288-.459-3.122-1.294-.45-.448-1.072-.706-1.707-.706-1.331 0-2.414 1.083-2.414 2.414v4.586c0 1.234.573 2.325 1.454 3.06l-.287 1.148c-.506.18-.968.435-1.4.728-.503-.891-.767-1.889-.767-2.936v-7c0-3.309 2.691-6 6-6s6 2.691 6 6z" /><path d="m56 47.184v-4.184h-2v4.184c-.847.302-1.514.969-1.816 1.816h-5.184v2h5.184c.414 1.161 1.514 2 2.816 2 1.654 0 3-1.346 3-3 0-1.302-.839-2.402-2-2.816zm-1 3.816c-.551 0-1-.448-1-1s.449-1 1-1 1 .448 1 1-.449 1-1 1z" /><path d="m10 47.184v-4.184h-2v4.184c-1.161.414-2 1.514-2 2.816 0 1.654 1.346 3 3 3 1.302 0 2.402-.839 2.816-2h5.184v-2h-5.184c-.302-.847-.969-1.514-1.816-1.816zm-1 3.816c-.551 0-1-.448-1-1s.449-1 1-1 1 .448 1 1-.449 1-1 1z" /></g></Svg>

            {<WindowsUser users={user} openUser={openUser}/> }
        </Main>
    );
};

export default Home;

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 10px;
    gap: 10px;
`

const ContentChat = styled.section`
    width: 100%;
    position: relative;
    height: 100vh;

        >ul{
            padding: 30px 0px 70px 20px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            overflow-y: scroll;
            scroll-behavior: smooth;
        }

    @media (min-width: 500px){
        width: 60%;
      
    }
`

const ContentConected = styled.section`
    display: none;
    background-color:white;
    height: 100vh;
    overflow-y: scroll;
    padding: 10px;

    >ul{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 2px;

        list-style: none;
    }

    @media (min-width: 500px){
        width: 40%;
        display: block;
        text-align: center;
        font-size: 0.8rem;
    }
`

const Svg = styled.svg`
    fill: #060047;
    display: block;
    width: 35px;
    border-radius: 20px;
    padding: 3px;
    background:#FF7000;
    position: absolute;

    top: 2%;
    right: 2%;

    @media (min-width:500px){
        display:none;
    }
`


const Form = styled.form`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: white ;
    @media (min-width: 500px){
        width: 60%;
    
    }

>button{
    width: 30%;
    height: 50px;
    border: none;
   
    background: #060047;
    color:  white;

    &:active{
        background:#FF7000;
        color: #060047;
    }
}

`

const Article = styled.article`
        width: 100%;

        >textarea{
            width: 100%;
            height: 50px;  
            padding: 10px;
        }

        
`