import { useState } from 'react'
import './App.css'
import { fetchData } from './api/fetchData'
import sppiner from './assets/Spinner.svg'
import search from './assets/search.svg'
import DaysArray from './components/DaysArray'
import cloudy from './assets/cloudy.jpg'
import sunny from './assets/sunny.jpg'
import clouds from './assets/clouds.jpg'
import rainy from './assets/rainy.jpg'
import lightRain from './assets/lightRain.jpg'
import moderateRain from './assets/moderateRain.jpg'
import scatteredClouds from './assets/scatteredClouds.jpg'
function App() {
  // Guardamos el nombre de la ubicación
  const [location, setLocation] = useState('')
  const [weatherInfo, setWeatherInfo] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSearch = () => {
    if (!location) {
      return '';
    }
    //Comienza la carga
    setLoading(true)
    setWeatherInfo({})
    setError('')
    //Llamos a fetchData es async, devuelve una promesa
    fetchData(location)
      .then((data) => {
        if (data) {
          setWeatherInfo(data)
        }
      })
      .catch(() => {
        setError('No se encontró ninguna ubicación')
      })
      .finally(() => { setLoading(false) })
  };

  const selectWeather = {
    'algo de nubes': clouds,
    'cielo claro': sunny,
    'lluvia ligera': lightRain,
    'lluvia moderada': moderateRain,
    'lluvioso': rainy,
    'muy nuboso': cloudy,
    'nubes dispersas': scatteredClouds,
    'nubes': clouds,
  }

  const myWeather = {
    backgroundImage: weatherInfo.weather?.weather[0]?.description ? `url(${selectWeather[weatherInfo.weather.weather[0].description]})` : '',
    backgroundSize: 'cover'
  };

  return (
    <>
      <h1 className='title'>OpenWeather</h1>
      <div className="container">
        <input autoFocus type="text" placeholder="Escribe tu ubicación" value={location} onChange={(e) => setLocation(e.target.value)} onKeyUp={(event) => {
          if (event.key === 'Enter') {
            onSearch();
          }
        }} />
        <div className="onSearchIcon" onClick={onSearch}><img src={search} alt={search} /></div>

      </div>

      {weatherInfo?.weather &&
        <div className="container__main" style={myWeather}>
          <div className="container__left"  >
            <h5>Tiempo en</h5>
            <h2>{weatherInfo.weather.name}</h2>
            <div className="container__weather">
              <div className="temp-img">
                <img src={`http://openweathermap.org/img/w/${weatherInfo.weather.weather[0].icon}.png`} alt="icon" />
              </div>
              <div className="temp">{(weatherInfo.weather?.main?.temp - 273.15).toFixed()}ºC</div>
            </div>
            <h4>{weatherInfo.weather.weather[0]?.description}</h4>
          </div>
          <div className="container__right">
            <div className="container__right-info">
              <p>Temp. max: <span className="temp-info">{(weatherInfo?.weather?.main?.temp_max - 273.15).toFixed()}ºC</span></p>
              <p>Temp. min: <span className="temp-info">{(weatherInfo?.weather?.main?.temp_min - 273.15).toFixed()}ºC</span></p>
            </div>
            <div className="container__weather-wind">
              <p>Humedad: <span className="temp-info">{weatherInfo?.weather?.main?.humidity}%</span></p>
              <p>Viento : <span className="temp-info">{weatherInfo?.weather?.wind?.speed}m/s</span></p>
            </div>
          </div>

          <div className="first">
            <DaysArray weatherInfo={weatherInfo} element={1} />
          </div>
          <div className="second">
            <DaysArray weatherInfo={weatherInfo} element={2} />
          </div>

          <div className="third">
            <DaysArray weatherInfo={weatherInfo} element={3} />
          </div>
        </div>
      }
      {loading && <img src={sppiner} alt="Loading.." />}
      {/* {error?.length && <p>{error}</p>} */}
      {error !== '' && <p>{error}</p>}
    </>
  )
}

export default App
