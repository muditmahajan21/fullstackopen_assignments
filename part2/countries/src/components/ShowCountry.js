import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ShowCountry = ({country}) => {
    const [showView, setShowView] = useState(false)
    const [currentWeather, setCurrentWeather] = useState({})

    const apiKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`)
        .then(response => {
            const currentWeatherObject = {
                temp: response.data.main.temp,
                img: 'http://openweathermap.org/img/wn/' + response.data.weather.icon + '@2x.png',
                wind: response.data.wind.speed
            }
            setCurrentWeather(currentWeatherObject)
        })
    })

    const renderView = showView ? 
    <li>
      <h1>{country.name.common}</h1>
      <div> <strong> Capital: </strong>  {country.capital}</div>
      <div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => (<li key={language.name}> {language} </li>))}
        </ul>
      </div>
        <div style={{ fontSize: '20em' }}>{country.flag} </div>
    <div>
        <h2> Weather in {country.capital} </h2>
        <strong> Temperature: </strong> {currentWeather.temp} Celsius <br />
        <img src={currentWeather.img} alt={country.capital} />
        <strong> Wind: </strong> {currentWeather.wind}    
    </div>
      <button onClick={() => setShowView(!showView)}> {showView ? 'Hide' : 'Show'} </button>
    </li>
    : <li>
      <h1>{country.name.common}</h1>
      <button onClick={() => setShowView(!showView)}>{showView ? 'Hide' : 'Show'}</button>
    </li>
    
    return (
        renderView
    )
}

export default ShowCountry


