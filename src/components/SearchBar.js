import React, { useState } from 'react'
import { buscarPokemon } from '../helpers/api';

const SearchBar = ({onSearch}) => {

    const [search,setSearch] = useState('');
    // const [pokemon, setPokemon] = useState();

    const handleChange = e => {
        setSearch(e.target.value);
        if(e.target.value.length === 0){
            onSearch(null);
        }
    }

    const handleClick = async e => {
        onSearch(search);
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input
                placeholder="Buscar Pokemon..."
                onChange={handleChange}/>
            </div>
            <div className="searchbar-btn">
                <button onClick={handleClick}>Buscar</button>
            </div>
        </div>
    )
}

export default SearchBar
