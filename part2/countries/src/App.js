import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FilterforCountries from './components/FilterforCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    const tempFilterCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilterCountries(tempFilterCountries)
  }

  return (
    <>
      <FilterforCountries onChange={handleFilterChange} countries={filterCountries} />
    </>
  )
}

export default App