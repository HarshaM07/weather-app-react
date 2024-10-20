import React from 'react';
import axios from 'axios';
// import './FavoriteCities.css';

function FavoriteCities({ favorites, setFavorites, fetchWeather }) {
    const addFavorite = async (city) => {
        try {
            await axios.post('http://localhost:5000/favorites', { name: city });
            setFavorites([...favorites, { name: city }]);
        } catch (error) {
            console.error("Error adding favorite city", error);
        }
    };

    const removeFavorite = async (city) => {
        try {
            await axios.delete(`http://localhost:5000/favorites/${city.id}`);
            setFavorites(favorites.filter(fav => fav.id !== city.id));
        } catch (error) {
            console.error("Error removing favorite city", error);
        }
    };

    return (
        <div className="favorites-container">
            <h3>Favorite Cities</h3>
            <ul>
                {favorites.map((city, index) => (
                    <li key={index}>
                        <span onClick={() => fetchWeather(city.name)}>{city.name}</span>
                        <button onClick={() => removeFavorite(city)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addFavorite(prompt("Enter city name"))}>Add Favorite</button>
        </div>
    );
}

export default FavoriteCities;
