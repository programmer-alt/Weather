import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  temperature: number,
  windSpeed?: number
}

const WeatherDisplay: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await axios.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=503b5760f08bc1afaf91246a950c28f8&units=metric`)
        if (res.status === 200) {
         console.log(' Запрос код 200', res.data )
        } else {
          console.log('Другой код запроса')
        }
        setWeatherData({
          temperature: res.data.main.temp,
          windSpeed: res.data.wind.speed
        });
      } catch (error) {
        console.log('Ошибка запроса', error)
      }
    }
    fetchWeatherData()
  }, [])

  return (
    <div>
      {weatherData? (
        <>
          <p>Температура в Лондоне: {weatherData.temperature} Градусов цельсия</p>
          <p>Скорость ветра в Лондоне : {weatherData.windSpeed?.toFixed(2)}m/s</p>
        </>
      ) : (<p>Загрузка погоды....</p>)}
    </div>
  )
}

export default WeatherDisplay