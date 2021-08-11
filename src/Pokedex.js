import React from 'react';
import Paginacion from './Paginacion';
import Pokemon from './Pokemon';

const Pokedex = (props) => {
    const {pokemons, page, setPage, total, loading} = props;

    const lastPage = () => {
        const nextPage = Math.max(page - 1, 0);
        setPage(nextPage)
    }

    const nextPage = () => {
        const nextPage = Math.min(page + 1, total);
        setPage(nextPage)
    }



    return(
        <div>
            <Paginacion
            page={page + 1}
            totalPages={total}
            onLeftClick={lastPage}
            onRightClick={nextPage}
            >
            </Paginacion>
            
            {loading ?
            <div>Carcando pokemones... </div>
            :
            <div className="pokedex-grid">
                {pokemons.map((pokemon, indice) => {
                    return(
                        <Pokemon pokemon={pokemon} key={pokemon.name}></Pokemon>
                    )
                })}
            </div>
            }
        </div>
    );
};

export default Pokedex;