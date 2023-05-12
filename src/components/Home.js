import React, { useState } from 'react'
import cloudy from "./../assets/Cloudy.jpg"
import axios from 'axios'
import { WeatherObjectCon } from './WeatherObjectCon'
import Loader from './Loader'
import { insertCity } from '../store/weatherSlice'
import { useDispatch } from 'react-redux'


const WEATHER_API_KEY = 'f31dc2b8b49a27efda7c2d44d41aa637'

const Home = () => {
    const [location, setlocation] = useState('')
    const [weatherDetails, setWeatherDetails] = useState({})
    const [showLoader, setShowLoader] = useState(true)

    const dispatch = useDispatch();

    const getWeatherOnLocation = async (longitude, latitude) => {
        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: latitude,
                    lon: longitude,
                    APPID: WEATHER_API_KEY,
                },
            });

            if (response.data) {
                const weatherObject = WeatherObjectCon(response.data.name, response.data.main.temp, response.data.main.pressure, response.data.main.humidity, response.data.wind.speed, response.data.clouds.all)
                setWeatherDetails(weatherObject)
                dispatch(insertCity(weatherObject))
                setShowLoader(true)
            }
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    }

    const getLocation = () => {
        setShowLoader(false)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("Location : ", position.coords)
                    getWeatherOnLocation(position.coords.longitude, position.coords.latitude);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }
    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            setShowLoader(false)
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: location,
                    APPID: WEATHER_API_KEY,
                },
            });

            if (response.data) {
                const weatherObject = WeatherObjectCon(response.data.name, response.data.main.temp, response.data.main.pressure, response.data.main.humidity, response.data.wind.speed, response.data.clouds.all)
                setWeatherDetails(weatherObject)
                dispatch(insertCity(weatherObject))
                setShowLoader(true)
            }
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    }
    return (
        <div className=" rounded w-500 shadow-xl m-10 p-5 border">
            <div className='flex justify-between'>
                <button className='bg-blue p-3 rounded-md' onClick={() => getLocation()}>Get Current Location</button>
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

            </div>

            {showLoader ? (<div className='text-center p-5 border m-5 mt-10 '>
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


            </div>) : <Loader />}


        </div>

    )
}

export default Home