import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from './components/SearchComponent';
import WeatherDisplay from './components/WeatherDisplay';
import FavoriteCities from './components/FavoriteCities';
import 'weather-icons/css/weather-icons.css';
import './App.css';

const API_KEY = 'c570fc7777708c35227e4c4f00f7fcbf';

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [isCelsius, setIsCelsius] = useState(true);

    const fetchWeather = async (city, useCelsius = true) => {
        try {
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
            setCurrentWeather(weatherResponse.data);
            setForecast(forecastResponse.data);
            localStorage.setItem('lastCity', city);
            localStorage.setItem('lastTemperatureUnit', useCelsius ? 'Celsius' : 'Fahrenheit');
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
    };

    const loadFavorites = async () => {
        try {
            const response = await axios.get('http://localhost:5000/favorites');
            setFavorites(response.data);
        } catch (error) {
            console.error("Error loading favorite cities", error);
        }
    };

    const toggleTemperatureUnit = () => {
        setIsCelsius((prev) => !prev);
    };

    useEffect(() => {
        loadFavorites();
        const lastCity = localStorage.getItem('lastCity');
        const lastUnit = localStorage.getItem('lastTemperatureUnit');
        if (lastCity) {
            setIsCelsius(lastUnit === 'Celsius');
            fetchWeather(lastCity, lastUnit === 'Celsius');
        }
    }, []);

    return (
        <div className="App">
            <h1>Weather Dashboard</h1>
            <SearchComponent fetchWeather={fetchWeather} isCelsius={isCelsius} toggleTemperatureUnit={toggleTemperatureUnit} />
            <WeatherDisplay currentWeather={currentWeather} forecast={forecast} isCelsius={isCelsius} />
            <FavoriteCities favorites={favorites} setFavorites={setFavorites} fetchWeather={fetchWeather} />
        </div>
    );
}

export default App;
