import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { WeatherObjectCon } from './WeatherObjectCon'
import CompleteForcast from './CompleteForcast'
import Loader from './Loader'

const WEATHER_API_KEY = 'f31dc2b8b49a27efda7c2d44d41aa637'

const Forcast = () => {
  const [location, setlocation] = useState('')
  const [NoOfDays, setNoOfDays] = useState(5)
  const [error, setError] = useState("");
  const [forcastDetail, setForcastDetail] = useState([]);
  const [showLoader, setShowLoader] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      setShowLoader(true)
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: location,
          APPID: WEATHER_API_KEY,
        },
      });
      if (response.data) {
        const ForcastList = response.data.list;

        const ForcastObject = [];
        ForcastList?.forEach(element => {
          ForcastObject.push(WeatherObjectCon(location, element.main.temp, element.main.pressure, element.main.humidity, element.wind.speed, element.clouds.all, element.dt_txt))
        });
        setForcastDetail(ForcastObject)
        setShowLoader(false)
      }
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  }

  const HandleNoofDays = (e) => {
    const value = e.target.value;
    setNoOfDays(value);

    if (value > 5) {
      setError("Number of days cannot exceed 5");
    } else {
      setError("");
    }
  };


  return (
    <div className=" rounded w-500 shadow-xl m-10 p-5 border">
      <div>
        <div className='flex justify-between'>

          <div className='flex items-center'>
            <input type="Number" id="voice-search" className=" border text-lg rounded-lg focus:ring-blue focus:border-blue block  pl-3 p-1"
              placeholder="Number of Days " required value={NoOfDays} onChange={(e) => { HandleNoofDays(e) }} />
            {error && <p className="text-red ml-3">{error}</p>}
          </div>

          <form className="flex items-center ">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <input type="text" id="voice-search" className=" border  text-lg rounded-lg focus:ring-blue-500
                                focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search a city." required value={location} onChange={(e) => { setlocation(e.target.value) }} />
            </div>
            <button type="submit" className="inline-flex items-center py-2 px-3 ml-2 text-lg font-medium text-black
                            rounded-lg border hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={(e) => handleSearch(e)}>
              Search
            </button>
          </form>

        </div>
        <div>
          {showLoader ? <Loader /> : <CompleteForcast forcastDetail={forcastDetail} NoOfDays={NoOfDays} />}
        </div>
      </div>


    </div>
  )
}

export default Forcast