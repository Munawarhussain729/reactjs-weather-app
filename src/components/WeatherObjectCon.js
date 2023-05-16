
export const WeatherObjectCon = (location, temperature, cloudy, wind, Humidity, pressure, Date) => {

    return {
        'Location': location,
        'ForcastDate': Date,
        'Temperature': (temperature - 273.15).toFixed(2),
        'Cloudy': cloudy,
        'Wind': wind,
        'Humaidity': Humidity,
        'Pressure': pressure
    }
}
