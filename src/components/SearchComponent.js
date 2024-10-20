import React, { useState, useEffect } from 'react';

function SearchComponent({ fetchWeather, isCelsius, toggleTemperatureUnit }) {
    const [city, setCity] = useState('');

    useEffect(() => {
        const lastCity = localStorage.getItem('lastSearchedCity');
        if (lastCity) {
            setCity(lastCity);
        }
    }, []);

    const handleSearch = () => {
        if (city.trim()) {
            fetchWeather(city, isCelsius);
            localStorage.setItem('lastSearchedCity', city);
            setCity('');
        } else {
            alert("Please enter a city name");
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={toggleTemperatureUnit}>
                Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
            </button>
        </div>
    );
}

export default SearchComponent;
