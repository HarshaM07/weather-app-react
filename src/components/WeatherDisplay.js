import React from 'react';
// import '../App.css'; // Ensure the correct CSS file is imported

function WeatherDisplay({ currentWeather, forecast, isCelsius }) {
    if (!currentWeather || !forecast) return <div>Please search for a city to display weather.</div>;

    // Function to get a unique forecast per day (e.g., at noon)
    const getDailyForecast = (forecastList) => {
        const dailyForecast = [];
        const seenDates = new Set();

        forecastList.forEach((entry) => {
            const date = new Date(entry.dt_txt).getDate();

            // Assuming "12:00:00" is the typical noon forecast. Adjust as needed.
            if (!seenDates.has(date) && entry.dt_txt.includes("12:00:00")) {
                dailyForecast.push(entry);
                seenDates.add(date);
            }
        });

        return dailyForecast;
    };

    const dailyForecasts = getDailyForecast(forecast.list);

    const getIconClass = (weatherMain) => {
        switch (weatherMain) {
            case 'Thunderstorm':
                return 'wi wi-thunderstorm';
            case 'Drizzle':
            case 'Rain':
                return 'wi wi-rain';
            case 'Snow':
                return 'wi wi-snow';
            case 'Clear':
                return 'wi wi-day-sunny';
            case 'Clouds':
                return 'wi wi-cloudy';
            default:
                return 'wi wi-na';
        }
    };

    const convertTemperature = (tempKelvin) => {
        return isCelsius 
            ? (tempKelvin - 273.15).toFixed(2) // Convert to Celsius
            : ((tempKelvin - 273.15) * 9/5 + 32).toFixed(2); // Convert to Fahrenheit
    };

    return (
        <div className="weather-display">
            <h2>{currentWeather.name}</h2>
            <div className="weather-info">
                <i className={`${getIconClass(currentWeather.weather[0].main)} icon`}></i>
                <p>Temperature: {convertTemperature(currentWeather.main.temp)} °{isCelsius ? 'C' : 'F'}</p>
            </div>
            <h3>5-Day Forecast</h3>
            <div className="forecast">
                {dailyForecasts.map((day, index) => (
                    <div key={index} className="forecast-day">
                        <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                        <i className={`${getIconClass(day.weather[0].main)} icon`}></i>
                        <p>{convertTemperature(day.main.temp)} °{isCelsius ? 'C' : 'F'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherDisplay;
