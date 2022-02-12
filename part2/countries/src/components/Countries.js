import React from 'react'
import ShowCountry from './ShowCountry'

const Countries = ({countries}) => {
    if(countries.length >= 10) {
        return (
            <p> Too many matches, specify another filter </p>
        )
    }
    else {
        return (
            <ul>
                {countries.map(country => <ShowCountry key={country.cca2} country={country} />)}
            </ul>
        )
    }
}

export default Countries