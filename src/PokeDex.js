import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar';
import Pokemons from './components/Pokemons';
import SearchBar from './components/SearchBar';
import { FavoriteContext } from './contexts/favoritesContext';
import { buscarPokemon, getPokemon, getPokemonData } from './helpers/api';
import './style.css';

const localStorageKey = "favorite_pokemon";

const PokeDex = () => {

    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [searching, setSearching] = useState(false);
    
    const fetchPokemons = async () =>{
        try {
            setLoading(true);
            const data = await getPokemon(24, 24 * page);
            // console.log(data.results);
            const promises = data.results.map(async (pokemon) => {
                return await getPokemonData(pokemon.url);
            })
            const results = await Promise.all(promises);
            setPokemons(results);
            setLoading(false);
            setTotal(Math.ceil(data.count / 24));
            setNotFound(false);
        } catch (error) {
            
        }
    }

    const loadFavoritePokemons = () => {
        const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
        setFavorites(pokemons);
    }

    useEffect(() => {
        loadFavoritePokemons();
    }, [])

    useEffect(() => {
        if(!searching){
            fetchPokemons();
        }
    },[page]);

    const updateFavoritePokemons = (name) => {
        const updated = [...favorites]
        const isFavorite = favorites.indexOf(name);
        if(isFavorite >= 0){
            updated.splice(isFavorite,1);
        }else{
            updated.push(name);
        }
        setFavorites(updated);
        window.localStorage.setItem(localStorageKey,JSON.stringify(updated));
    }

    const onSearch = async (pokemon) => {
        if(!pokemon){
            return fetchPokemons();
        }
        setLoading(true);
        setNotFound(false);
        setSearching(true);
        const result = await buscarPokemon(pokemon);
        if(!result){
            setNotFound(true);
            setLoading(false);
            return;
        }else{
            setPokemons([result]);
            setPage(0);
            setTotal(1);
        }
        setLoading(false);
        setSearching(false);
    }
    
    return (
        <FavoriteContext.Provider
            value={{favoritePokemons : favorites,
            updateFavoritePokemons: updateFavoritePokemons}}
        >
            <div>
                <NavBar/>
                {/* <hr/> */}
                {/* <br/> */}
                <div className="app">
                    <SearchBar
                        onSearch={onSearch}
                    />
                    {notFound ? 
                        <div className="not-found-text">No se encontro el Pokemon</div>
                        :
                        <Pokemons pokemons={pokemons}
                        loading={loading}
                        page={page}
                        setPage={setPage}
                        total={total}/>
                    }
                </div>
            </div>
        </FavoriteContext.Provider>
    )
}

export default PokeDex
