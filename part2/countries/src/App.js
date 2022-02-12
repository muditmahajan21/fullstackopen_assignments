import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])

  const [filter, setFilter] = useState('')
  const [filterCountries, setFilterCountries] = useState(countries)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log(countries)
    setFilterCountries(countries.filter((country) => 
      (country.name.common.indexOf(event.target.value) !== -1)))
  }

  return (
    <div>
      <div>
        find countries <input onChange={handleFilterChange} value = {filter} />
      </div>
      { filterCountries.length <= 10 ?
        filterCountries.length === 1 ?
        filterCountries.map(country => {
          return (
            <div>
              <h1> {country.name.common} </h1>
              <p> Capital {country.capital} </p>
              <strong> Languages </strong>
              <ul>
                {Object.keys(country.languages).map(key => (
                  <li key={key} >{country.languages[key]}</li>
                ))}
              </ul>
              <div style={{ fontSize: '20em' }}>{country.flag}</div>
            </div>
          )
        })
        :
        filterCountries.map(country => <p> {country.name.common} </p>)
        :
        <p> Too many matches, please specify another filter </p>
      }
    </div>
  )
}

export default App