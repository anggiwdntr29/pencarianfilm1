import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";


const App = () => {
const [popularMovies, setPopularMovie] = useState ([])
const baseImgUrl = process.env.REACT_APP_BASEIMGURL;

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovie(result)
    })
  }, [])

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img src={`${baseImgUrl}/${movie.poster_path}`} alt="" className="Movie-img"/>
          <div className="Movie-date">{movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async(q) => {
    if (q.length > 3){
      const  query = await searchMovie(q);
      setPopularMovie(query.results);
  }
}


  useEffect(() => {
    document.title = "Anggi Movie";
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1>ANGGI MOVIE</h1>
        <input
          placeholder="Cari Film"
          className="Search-film"
          onChange={({target}) => search(target.value)}
        />
        <div className="Movie-contaier">
          <PopularMoviesList/>
        </div>
      </header>
    </div>
  );
}

export default App;
