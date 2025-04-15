import { useState, useEffect } from 'react';
import type { FC } from 'react';
import axios from 'axios';
import './App.css';
import getWeatherDescription from './utils/getWeatherDescription';

type WeatherData = {
  date: string;
  maxTemp: number;
  minTemp: number;
  weather: string;
  city: string;
};

const App: FC = () => {
  const [city, setCity] = useState<string>('上海');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCityCoordinates(city);
  }, []);

  const getCityCoordinates = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: cityName,
          format: 'json',
        },
      });

      if (!response.data.length) {
        throw new Error('未找到该城市');
      }
      
      const { lat, lon } = response.data[0];
      await fetchWeatherData(lat, lon);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (lat: string, lon: string) => {
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          daily: 'temperature_2m_max,temperature_2m_min,weathercode',
          timezone: 'auto',
        },
      });

      const { daily } = response.data;
      
      const formattedData: WeatherData[] = daily.time.map((date: string, index: number) => ({
        date,
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
        weather: getWeatherDescription(daily.weathercode[index]),
        city,
      }));

      setWeatherData(formattedData);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : '获取天气数据时发生错误');
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const renderWeatherCards = () => {
    if (loading) {
      return <div className="loading">加载中...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    if (weatherData.length > 0) {
      return (
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
      );
    }

    return null;
  };
  
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
      {renderWeatherCards()}
    </div>
  );
};

export default App;
