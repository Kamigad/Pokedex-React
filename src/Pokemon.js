import React, { useContext } from 'react';
import FavoriteContext from './context/favoriteContext';

const Pokemon = (props) => {
    const {pokemon} = props;
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext);

    const redHeart = "❤️";
    const sparklingHeart = "💖";

    const heart = favoritePokemons.includes(pokemon.name) ? sparklingHeart :  redHeart

    const clikcHeart = (e) => {
        e.preventDefault();
        updateFavoritePokemons(pokemon.name);
    }

    return(
        <div className="pokemon-card">
            <div className="pokemon-img-container">
                <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="pokemon-img"
                ></img>
            </div>
            <div className="card-body">
                <div className="card-top">
                    <h3>{pokemon.name}</h3>
                    <div>#{pokemon.id}</div>
                </div>
                <div className="card-botton">
                    <div className="pokemon-type">
                        {pokemon.types.map((type, index) => {
                            return (
                                <div key={index} className="pokemon-type-text">{type.type.name}</div>
                            )
                        })}
                    </div>
                       <button className="button-favorite" onClick={clikcHeart}> 
                       <div className="pokemon-favorite">{heart}</div>
                        </button> 
                </div>
            </div>


        </div>
    )
};

export default Pokemon;