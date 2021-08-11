import React from "react";
import FavoriteContext from "./context/favoriteContext";
const {useState} = React;
const {useContext} = React;

const Searchbar =(props) => {

  const {onSearch} = props;
    const [search, setSearch] = useState('');
    const {favoritePokemons} = useContext(FavoriteContext);

    const onChange = (evt) => {
        setSearch(evt.target.value);
        if (evt.target.value.length === 0) {
          onSearch(null);
        }
    }

    const onClick = async (evt) => {
      onSearch(search);
    }
    
    
    

return (
    <div>
        <nav className='navbar navbar-dark bg-dark'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/#'>
            Pokedex
          <span className='badge badge-pill badge-light ml-2'>
            {favoritePokemons.length}
          </span>
          </a>
          <form className='d-flex'>
            <input className='form-control me-2' type="search" placeholder="Search" aria-label="Search" 
            onChange={onChange}></input>
            <button className='btn btn-outline-success' type="button" onClick={onClick}>
              Search
            </button>
            
          </form>
        </div>
      </nav>
    </div>
)

};

export default Searchbar;