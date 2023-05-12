import React, { useEffect, useState } from 'react'
import cloudy from "./../assets/Cloudy.jpg"
import axios from 'axios'
import { WeatherObjectCon } from './WeatherObjectCon'
import Loader from './Loader'
import { insertCity } from '../store/weatherSlice'
import { useDispatch, useSelector } from 'react-redux'


const WEATHER_API_KEY = 'f31dc2b8b49a27efda7c2d44d41aa637'

const GetWeatherCard = (weatherDetails) => {
    return (
        <div className=" rounded w-500 shadow-xl m-10 p-5 border">
            <div className='text-center p-5 m-5 mt-10 '>
                <h1> <span className='text-lg font-semibold'>Location:</span> {weatherDetails?.Location}</ h1>
                <div className='flex justify-between h-250 items-center '>
                    <div className='flex flex-col justify-center'>
                        <img src={cloudy} alt='Cloudy not found' className='w-40 h-40 rounded-full' />
                        <h3> <span className='text-lg font-semibold'>Cloudy:</span> {weatherDetails?.Cloudy}</h3>
                    </div>
                    <h3> <span className='text-lg font-semibold'>Temperature:</span> {weatherDetails?.Temperature} C</h3>
                    <div>
                        <p> <span className='text-lg font-semibold'>Wind:</span> {weatherDetails?.Wind}</p>
                        <p><span className='text-lg font-semibold'>Humidity:</span> {weatherDetails?.Humaidity} </p>
                        <p><span className='text-lg font-semibold'>Pressure:</span> {weatherDetails?.Pressure}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
const SearchPage = () => {

    const [location, setlocation] = useState('');
    const [weatherDetails, setWeatherDetails] = useState({});
    const dispatch = useDispatch();

    const defaultData = useSelector((state) => state.weather.weatherHistory);

    useEffect(() => {
        const defaultLocation = ['Lahore', 'Karachi', 'Murree'];

        const getDefaultData = async (location) => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        q: location,
                        APPID: WEATHER_API_KEY,
                    },
                });

                if (response.data) {
                    const weatherObject = WeatherObjectCon(
                        response.data.name,
                        response.data.main.temp,
                        response.data.main.pressure,
                        response.data.main.humidity,
                        response.data.wind.speed,
                        response.data.clouds.all
                    );
                    dispatch(insertCity(weatherObject));
                }
            } catch (error) {
                console.error(error);
                // Handle errors
            }
        };
        const fetchData = async () => {
            for (let i = 0; i < defaultLocation.length; i++) {
                console.log("called");
                await getDefaultData(defaultLocation[i]);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: location,
                    APPID: WEATHER_API_KEY,
                },
            });

            if (response.data) {
                const weatherObject = WeatherObjectCon(
                    response.data.name,
                    response.data.main.temp,
                    response.data.main.pressure,
                    response.data.main.humidity,
                    response.data.wind.speed,
                    response.data.clouds.all
                );
                setWeatherDetails(weatherObject);
                dispatch(insertCity(weatherObject));
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className=" rounded w-500 shadow-xl m-10 p-5 border">
            <form className="flex items-center ">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <input type="text" id="voice-search" className=" border  text-lg rounded-lg focus:ring-blue-500
                             focus:border-blue-500 block w-full pl-10 p-2.5"
                        placeholder="Search a city." required value={location} onChange={(e) => { setlocation(e.target.value) }} />
                </div>
                <button type="submit" className="inline-flex items-center py-2 px-3 ml-2 text-sm font-medium text-black
                         rounded-lg border hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={(e) => handleSearch(e)}>
                    Search
                </button>
            </form>

            <div className=" flex flex-wrap items-center justify-center rounded w-500 shadow-xl m-10 p-5">
                {
                    defaultData?.map((CityData) => GetWeatherCard(CityData))
                }
            </div>

        </div>
    )
}

export default SearchPage