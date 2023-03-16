import './App.css';
import React from 'react';
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Footer from './components/Footer/Footer'
import MovieDetail from './components/MovieDetails/MovieDetail'
import {Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className='app'>
      <Header/>
      <div className="container">
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/movie/:imdbID' element={<MovieDetail/>}/>
        <Route  path="*" element={<PageNotFound/>}/>
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
