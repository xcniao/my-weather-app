import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';
import getWeatherDescription from './utils/getWeatherDescription';

type WeatherData = {
  date: string;
  maxTemp: number;
  minTemp: number;
  weather: string;
  city: string;
};

const App: React.FC = () => {
  const [city, setCity] = useState<string>('上海');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCityCoordinates(city);
  }, []);

  // 获取城市经纬度
  const getCityCoordinates = async (cityName: string) => {
    setLoading(true);
    try {
      setError(null);
      // 使用 Nominatim API 获取城市的经纬度
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: cityName,
            format: 'json',
          },
        }
      );

      if (!res.data.length) {
        setError('未找到该城市');
        return;
      }
      const { lat, lon } = res.data[0];
      fetchWeatherData(lat, lon);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  // 获取天气数据
  const fetchWeatherData = async (lat: string, lon: string) => {
    try {

      // 使用经纬度获取天气数据
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude: lat,
            longitude: lon,
            daily: 'temperature_2m_max,temperature_2m_min,weathercode',
            timezone: 'auto',
          },
        }
      );

      const daily = weatherResponse.data.daily;
      const weatherData: WeatherData[] = daily.time.map((date: string, index: number) => ({
        date,
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
        weather: getWeatherDescription(daily.weathercode[index]),
        city: city,
      }));

      setWeatherData(weatherData);
      setLoading(false);
    }catch (err) {
      setError(err instanceof Error ? err.message : '获取天气数据时发生错误');
      setLoading(false);
    }
  }
  
  return (
    <div className="app-container">
      <h2>天气预报</h2>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="请输入城市名称"
        />
        <button onClick={() => getCityCoordinates(city)}>获取天气</button>
      </div>
      {loading && (
        <div className="loading">加载中...</div>
      )}
      {error && !loading ? (
        <div className="error">{error}</div>
      ) : (
        !loading && weatherData.length > 0 && (
          <div className="weather-cards">
            {weatherData.map((day) => (
              <div className="weather-card" key={day.date}>
                <h2>{day.date}</h2>
                <p>城市: {day.city}</p>
                <p>最高温度: {day.maxTemp}°C</p>
                <p>最低温度: {day.minTemp}°C</p>
                <p>天气: {day.weather}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default App;
