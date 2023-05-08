import { configureStore } from '@reduxjs/toolkit'
import loadinslice from './slice/loadin.slice'
import messagesslice from './slice/messages.slice'
import userslice from './slice/user.slice'



export default configureStore({
    reducer: {
        loading: loadinslice,
        messages: messagesslice,
        user: userslice
    }
})
