import React, { useEffect, useState } from 'react'
import cloudy from "./../assets/Cloudy.jpg"
import axios from 'axios'
import { WeatherObjectCon } from './WeatherObjectCon'
// import { insertCity, deleteCity } from '../store/weatherSlice'
// import { useDispatch, useSelector } from 'react-redux'


const WEATHER_API_KEY = 'f31dc2b8b49a27efda7c2d44d41aa637'

const GetWeatherCard = ({ weatherDetails, setCitiesWeather }) => {
    // const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault()
        let cities = [];
        const citiesWeatherString = localStorage.getItem('citiesWeather');
        if (citiesWeatherString) {
            try {
                let Tempcities = JSON.parse(citiesWeatherString);
                cities = Tempcities.filter((city) => { return JSON.stringify(city) !== JSON.stringify(weatherDetails) })
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
        localStorage.setItem('citiesWeather', JSON.stringify(cities));
        // window.location.reload()
        setCitiesWeather(cities)
        // dispatch(deleteCity(weatherDetails))
    }
    return (
        <div className=" rounded w-max bg-gradient-to-r from-cyan to-gray shadow-xl m-10 p-5 ">
            <div className='text-center p-5 m-5 mt-10 '>
                <h1> <span className='text-lg font-semibold'>Location:</span> {weatherDetails?.Location}</ h1>
                <div className='flex justify-between h-250 items-center '>
                    <div className='flex flex-col justify-center'>
                        <img src={cloudy} alt='Cloudy not found' className='w-40 h-40 rounded-full' />
                        <h3> <span className='text-lg font-semibold'>Cloudy:</span> {weatherDetails?.Cloudy}</h3>
                    </div>
                    <h3 className='m-5'> <span className='text-lg font-semibold'>Temperature:</span> {weatherDetails?.Temperature} C</h3>
                    <div>
                        <p> <span className='text-lg font-semibold'>Wind:</span> {weatherDetails?.Wind}</p>
                        <p><span className='text-lg font-semibold'>Humidity:</span> {weatherDetails?.Humidity} </p>
                        <p><span className='text-lg font-semibold'>Pressure:</span> {weatherDetails?.Pressure}</p>
                    </div>
                </div>
                <button className='border p-3' onClick={(e) => handleDelete(e)}>Delete Card</button>
            </div>
        </div>
    )
}
const SearchPage = () => {

    const [location, setlocation] = useState('');
    const [weatherDetails, setWeatherDetails] = useState({});
    // const dispatch = useDispatch();
    const [citiesWeather, setCitiesWeather] = useState([]);
    // const defaultData = useSelector((state) => state.weather.weatherHistory);

    useEffect(() => {
        let cities = [];
        const citiesWeatherString = localStorage.getItem('citiesWeather');
        if (citiesWeatherString) {
            try {
                cities = JSON.parse(citiesWeatherString);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
        setCitiesWeather(cities);

    }, [])
    // useEffect(() => {
    //     const defaultLocation = ['Lahore', 'Karachi', 'Murree'];

    //     const getDefaultData = async (location) => {
    //         try {
    //             const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    //                 params: {
    //                     q: location,
    //                     APPID: WEATHER_API_KEY,
    //                 },
    //             });

    //             if (response.data) {
    //                 const weatherObject = WeatherObjectCon(
    //                     response.data.name,
    //                     response.data.main.temp,
    //                     response.data.main.pressure,
    //                     response.data.main.humidity,
    //                     response.data.wind.speed,
    //                     response.data.clouds.all
    //                 );
    //                 dispatch(insertCity(weatherObject));
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             // Handle errors
    //         }
    //     };
    //     const fetchData = async () => {
    //         for (let i = 0; i < defaultLocation.length; i++) {
    //             await getDefaultData(defaultLocation[i]);
    //         }
    //     };

    //     fetchData();
    // }, []);

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
                const weatherObject = WeatherObjectCon({
                    location: response.data.name,
                    temperature: response.data.main.temp,
                    cloudy: response.data?.weather[0]?.description,
                    wind: response.data.wind.deg,
                    humidity: response.data.main.humidity,
                    pressure: response.data.main.pressure
                });
                setWeatherDetails(weatherObject);
                let cities = [];
                const citiesWeatherString = localStorage.getItem('citiesWeather');
                if (citiesWeatherString) {
                    try {
                        cities = JSON.parse(citiesWeatherString);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
                cities.push(weatherObject);
                localStorage.setItem('citiesWeather', JSON.stringify(cities));
                setCitiesWeather(cities);

            }
        } catch (error) {
            alert(error.response?.data?.message)
        }
    };


    return (
        <div className=" rounded bg-gray text-white w-500 shadow-xl  p-10 m-0 border">
            <form className="flex items-center ">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <input type="text" id="voice-search" className=" bg-cyan  text-black placeholder-black text-lg rounded-lg focus:ring-blue-500
                             focus:border-blue-500 block w-full pl-10 p-2.5"
                        placeholder="Search a city." required value={location} onChange={(e) => { setlocation(e.target.value) }} />
                </div>
                <button type="submit" className="inline-flex items-center text-lg py-2.5 px-3 ml-2 font-medium text-gray bg-cyan
                            rounded-lg  hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={(e) => handleSearch(e)}>
                    Search
                </button>
            </form>

            <div className=" flex flex-wrap items-center justify-center rounded w-500 shadow-xl m-10 p-5">
                {citiesWeather?.map((CityData, index) => {

                    return < GetWeatherCard key={index} weatherDetails={CityData} setCitiesWeather={setCitiesWeather} />
                })}
            </div>

        </div>
    )
}

export default SearchPage