import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import movieApi from '../../common/apis/MovieAPI'
import {APIKey} from '../../common/apis/MovieAPIkey'

const initialState = {
  movie: {},
  shows:{},
  selectedMoiveOrShow:{},
  loader: false,
}

export const fetchAsyncMovies=createAsyncThunk(
    "movies/fetchAsyncMovies",
    async (search)=>{
    const response = await  movieApi.get(`?apikey=${APIKey}&s=${search}&type=movie`)
    return response.data;
    }
)

export const fetchAsyncShows=createAsyncThunk(
    "movies/fetchAsyncShows",
    async (search)=>{
    const response = await  movieApi.get(`?apikey=${APIKey}&s=${search}&type=series`)
    return response.data;
    }
)

export const fetchAsyncMovieOrShowDetails=createAsyncThunk(
    "movies/fetchAsyncamovieOrShowDetails",
    async (id)=>{
        try{
        const response = await  movieApi.get(`?apikey=${APIKey}&i=${id}&plot=full`)
        return response.data;
        }
        catch{
            console.error("Eroor");
        }
    }
)

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    removeSelectedMovieOrShow:(state)=>{
        state.selectedMoiveOrShow={};
    }
  },
  extraReducers:{
    [fetchAsyncMovies.pending]: (state)=>{
        console.log("Pending");
        state.loader=true;
    },
    [fetchAsyncMovies.fulfilled]: (state, {payload})=>{
        state.loader=false;
        console.log("Fetch successfully");
        state.movie = payload;
    },
    [fetchAsyncMovies.rejected]: (state)=>{
        console.log("Rejected");
        state.loader=true;
    },


    [fetchAsyncShows.pending]: (state)=>{
        console.log("Pending");
        state.loader=true;
    },
    [fetchAsyncShows.fulfilled]: (state, {payload})=>{
        console.log("Fetch successfully");
        state.shows = payload;
    },
    [fetchAsyncShows.rejected]: (state)=>{
        console.log("Rejected");
        state.loader=true;
    },


    [fetchAsyncMovieOrShowDetails.pending]: (state)=>{
        console.log("Pending");
        state.loader=true;
    },
    [fetchAsyncMovieOrShowDetails.fulfilled]: (state, {payload})=>{
        console.log("Fetch successfully");
        state.selectedMoiveOrShow = payload;    
    },
    [fetchAsyncMovieOrShowDetails.rejected]: (state)=>{
        console.log("Rejected");
        state.loader=true;
    },

  }
});

export const {addMovies,removeSelectedMovieOrShow}=movieSlice.actions;
export const getAllMovies=(state)=>state.movies.movie;
export const getAllShows=(state)=> state.movies.shows;

export const getAllSelectedShow=(state)=>state.movies.selectedMoiveOrShow;
export default movieSlice.reducer;