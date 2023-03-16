import {configureStore} from '@reduxjs/toolkit'
import { movieSlice } from './movies/MovieSlice'

export const store=configureStore({
    reducer :{
     movies : movieSlice.reducer,
    }
})