
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Forcast from './components/Forcast';
import SearchPage from './components/SearchPage';
import axios from 'axios'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { WeatherObjectCon } from './components/WeatherObjectCon'
import { insertCity } from './store/weatherSlice'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


const WEATHER_API_KEY = 'f31dc2b8b49a27efda7c2d44d41aa637'


function App() {

 
  return (
    <div className="App ">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/forcast' element={<Forcast />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
