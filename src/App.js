import './App.css';
import { getMovieList, searchMovie} from "./api"
import { useEffect, useState } from "react"

const App =() => {
  const [popularMovies, setPopularMovies] = useState([])
    
  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, []) 

const PopularMovieList = () => {
  return popularMovies.map((movie, i) => {
    return (
        <div className="Movie-Wrapper" key={i}>
            <div className="Movie-Title">{movie.title}</div>
              <img
               className="Movie-Image"
               src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
 
               />
              <div className="Movie-Date">release:{movie.release_date}</div>
              <div className="Movie-Rate">{movie.vote_average}</div>
        </div>
    )
  })
}
 
  

const search = async (q) => {
  if (q.length >= 3) {
      const query = await searchMovie(q);
      if (query.results && query.results.length > 0) {
          setPopularMovies(query.results);
      } else {
          console.log("No movies found");
      }
  }

  if (q === "") {
      const popularMovies = await getMovieList();
      setPopularMovies(popularMovies);
  }
};



  console.log({popularMovies: popularMovies})

  return (
    <div className="App">
      <header className="App-header">
      <h1>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
          MOVIE WEB
          </a>
      </h1>
          <input
          placeholder="Cari Film" 
          className="Search-Bar"
          onChange={({ target }) => search(target.value)}
          />
          <div className="Movie-Container">
              <PopularMovieList />
          </div>
      </header>
    </div>
  )
}
export default App;
