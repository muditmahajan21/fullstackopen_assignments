import React, {useState} from 'react'

const ShowCountry = ({country}) => {
    const [showView, setShowView] = useState(false)

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


