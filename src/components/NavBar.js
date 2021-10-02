import React, { useContext } from 'react'
import { FavoriteContext } from '../contexts/favoritesContext';

const NavBar = () => {

    const {favoritePokemons} = useContext(FavoriteContext);
    // console.log(favoritePokemons);
    return (
        <nav>
            <div>
                <div>
                    <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeApi-logo"
                    className="navbar-image"/>
                    
                </div>
                
            </div>&#10084;&#65039; {favoritePokemons.length}
        </nav>
    )
}

export default NavBar
