// App.js
import './App.css';
import React, { useEffect, useState } from 'react';

async function fetchMovies(searchTerm, page) {
  const url = `http://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=57c1e838`;
  const response = await fetch(url);
  const result = await response.json();
  return result.Search || [];
}

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const moviesPage1 = await fetchMovies('Guardians', 1);
        const moviesPage2 = await fetchMovies('Guardians', 2);
        const combinedMovies = [...moviesPage1, ...moviesPage2].slice(0, 20);
        setMovies(combinedMovies);
      } catch (error) {
        console.error(error);
      }
    }
    loadMovies();
  }, []);

  return (
    <div className="App">
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            <h2>{movie.Title}</h2>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Type:</strong> {movie.Type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
