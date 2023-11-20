import React,{useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [myData, setMyData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('yellow+flowers');
  useEffect(() => {
    axios.get(`https://pixabay.com/api/?key=40174267-d05a774fd3b421cdd1499637a&q=${query}`)
    .then((res) => setMyData(res.data.hits))
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="resultArea">
        {myData.map((post) => {
          console.log(post)
          const {id, largeImageURL, tags, likes} = post;
          console.log(id, largeImageURL, tags, likes)
          return <div className="card" key={id}>
            <img className="image" src={largeImageURL} alt="" />
            <p>Likes: {likes}<br />Tags: {tags}</p>
          </div>
        })
        }
      </div>
    </div>
  )
}
export default App;