import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { setIsLoading } from './loadin.slice';
import getConfig from '../../utils/getConfig';

export const messagesslice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        setMessages: (state, action) => {
            const message = action.payload
            return message
        }
    }
})

export const getAllMessageThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get('/messages', getConfig())
        .then((res) => dispatch(setMessages(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const creatteMessagesThunk = (data) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post('/messages',data, getConfig())
        .then(() => dispatch(getAllMessageThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}
export const { setMessages} = messagesslice.actions;

export default messagesslice.reducer;
