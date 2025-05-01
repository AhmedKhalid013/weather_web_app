import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import cloud_icon from '../assets/cloud.png'
import snow_icon from '../assets/snow.png';
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'

const Weather = () => {
    const inputRef=useRef();
    const [weatherData,setWeatherData]=useState(false);
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }
    const search=async (city)=>{
        if(city===""){
            alert("Enter City Name");
            return;
        }
        try{
          //  const apiKey = "ad797a3b2d04cf00ad30ca32aea23b36";
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`;
            const response=await fetch(url);
            const data=await response.json();
            console.log(data);
            const icon=allIcons[data.weather[0].icon] || clear_icon;
            console.log(icon);
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
        }catch(error){
            console.error("Error fetching weather data:", error);

        }
    }
    
useEffect(() => {
  search("Lahore");
  },[]);

    // Handle form submit or click on search icon
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        search(inputRef.current.value);
    }
  return (
    <div className="weather">
           <form className="search-bar" onSubmit={handleSubmit}>
                <input ref={inputRef} type="text" placeholder="Search" />
                <img className="search_icon" src={search_icon} onClick={() => search(inputRef.current.value)} alt="Search Icon" />
            </form>
        
        <img src={weatherData.icon} alt="" className="weather_icon"/>
        <p className="temperature">{weatherData.temperature}°</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather_data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h %</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Weather;
