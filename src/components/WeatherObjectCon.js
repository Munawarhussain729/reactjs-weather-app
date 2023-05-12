
export const WeatherObjectCon = (location, temperature, cloudy, wind, Humidity, pressure) => {
    
    return {
        'Location': location,
        'Temperature': (temperature -273.15).toFixed(2),
        'Cloudy': cloudy,
        'Wind': wind,
        'Humaidity': Humidity,
        'Pressure': pressure
    }
}
