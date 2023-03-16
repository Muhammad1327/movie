import React from 'react'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import { getAllMovies, getAllShows } from '../../features/movies/MovieSlice'
import MovieCard from "../MovieCard/MovieCard"
import './MovieListing.css'
import { settings } from '../../common/settings'


const MovieListing = () => {
  
  const movies = useSelector(getAllMovies) 
  const shows = useSelector(getAllShows) ;
  const loader = useSelector(state=>state.movies.loader) ;
  let renderMovies , renderShows="";

  console.log(shows);
  renderMovies = movies.Response === "True" ? (
      movies.Search.map((movie, index) =>
        <MovieCard key={index}  data={movie}/>
        )
  ) :
  (
  <div className="movie-error">
    <h1>{movies.Error}</h1>
  </div>
  );

  renderShows = shows.Response === "True" ? (
    shows.Search.map((shows, index) =>
      <MovieCard key={index}  data={shows}/>
      )
) :
(
<div className="shows-error">
  <h1>{shows.Error}</h1>
</div>
);

  return(
    <>
    {loader ? <h1 className='loading'>Loading...</h1> : ""}
    <div className='movie-wrapper'>
      <div className='movie-list'>
        <h2>Movies</h2>
        <div className="movie-container">
           <Slider {...settings}>{renderMovies}</Slider>
        </div>

        <div className='shows-list'>
          <h2>Shows</h2>
          <div className="movie-container">
           <Slider {...settings}>{renderShows}</Slider>
          </div>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default MovieListing
