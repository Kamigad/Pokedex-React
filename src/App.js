import './App.css';
import React from 'react';
import Searchbar from './Searchbar';
import Pokedex from './Pokedex';
import { getPokemons, getPokemonsData, searchPokemon } from './Api';
import { FavoriteProvider } from './context/favoriteContext';

const {useState, useEffect} = React;
const localStorageKey = "favorite_pokemon"

export default function App () {
  let imgUrl= 'https://img.icons8.com/color/452/pokedex.png';

  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(['bulbasaur']);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(true);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons(25, 25 * page);
      const promise = data.results.map((pokemon) => {
        return getPokemonsData(pokemon.url)
      })
      const result = await Promise.all(promise)
      setPokemons(result)
      setLoading(false);
      setTotal(data.count / 25);
      setNotFound(false);
    }catch(err){

    }
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result])
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);

  }

  useEffect(() => {
    loadFavoritePokemons();
    
  }, [])

  useEffect(() =>{
    fetchPokemons();
    if (!searching) {
      fetchPokemons();
    }
  }, [page])

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite =  updated.indexOf(name);
    if(isFavorite >= 0)
    {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated))
  };
  
  return(
    <FavoriteProvider value={{favoritePokemons: favorites, 
    updateFavoritePokemons: updateFavoritePokemons}}>
      
    <div className="App">

      <Searchbar onSearch={onSearch}></Searchbar>
      

      <div className='text-center' >
        <img src={imgUrl} alt='pokeapi-logo' className='rounded'></img>
        
      </div>
      {notFound ?(
      <div className='not-found-text'>No se encontro el pokemon que buscaba</div>
      ): (
        <Pokedex 
        pokemons={pokemons}
        page={page}
        setPage={setPage}
        total={total}
        loading={loading}
        >
        </Pokedex>
        )}
      
      

    </div>
    </FavoriteProvider>
  )

}
