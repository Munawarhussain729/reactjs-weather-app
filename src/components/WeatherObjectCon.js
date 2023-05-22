export const WeatherObjectCon = ({ location, temperature, cloudy, wind, humidity, pressure, date }) => {
  const currentDate = date || new Date();

  return {
    'Location': location,
    'ForcastDate': currentDate,
    'Temperature': (temperature - 273.15).toFixed(2),
    'Cloudy': cloudy,
    'Wind': wind,
    'Humidity': humidity,
    'Pressure': pressure
  };
};
