import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  temperature: number,
  windSpeed: number
}

const WeatherDisplay: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=503b5760f08bc1afaf91246a950c28f8&units=metric`)
        if (response.status === 200) {
          console.log(' Запрос кода 200', response.data)
        } else {
          console.log('Запрос кода не 200')
        }
        setWeatherData({
          temperature: response.data.main.temp,
          windSpeed: response.data.wind.speed
        })
      } catch (error) {
        console.log(' Ошибка запроса', error)
      }
    }
    fetchWeatherData()
  }, [])

return (
   <div>
    {weatherData ? (
      <>
        <h1>Температура: {weatherData.temperature}°C</h1>
        <h2>Скорость ветра: {weatherData.windSpeed} м/с</h2>
      </>
    ) : (
      <p>Загрузка...</p>
    )}
   </div>
)

}

export default WeatherDisplay