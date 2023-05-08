import { createSlice } from '@reduxjs/toolkit';

export const loadinslice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        setIsLoading: (state, action) => {
            const loading = action.payload
            return loading
        }
    }
})

export const {setIsLoading } = loadinslice.actions;

export default loadinslice.reducer;
