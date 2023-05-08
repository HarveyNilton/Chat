import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { setIsLoading } from './loadin.slice';
import getConfig from '../../utils/getConfig';

export const userslice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        setUsers: (state, action) => {
            const user = action.payload
            return user
        }
    }
})

export const getAllUsersThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get('/users',getConfig())
        .then((res) => dispatch(setUsers(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteUserThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.delete(`/users/${id}`)
        .then(() => dispatch(getAllUsersThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const userLoginThunk = (data,navigate,reset,setMessage,setTError) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post('/users/login', data, getConfig())
        .then((res) => {
            dispatch(getAllUsersThunk())
            localStorage.setItem('token', res.data.token);
            reset();
            navigate(`/${data.userName}`)
        }).catch(err => {
            setMessage(err.response.data.message)
            setTError(true);
            setTimeout(() => {
                setTError(false);
            }, 3000);
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setUsers } = userslice.actions;

export default userslice.reducer;
