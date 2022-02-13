import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import axios from 'axios'

const Heading = ( {heading} ) => <h2> {heading} </h2>

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()

    const personsArray = persons.map(e => e.name)

    const personObject = {
      name: newName,
      number: newNumber,
      id: personsArray.length + 1,
    }

    personsArray.includes(`${personObject.name}`) ? 
      alert(`${newName} is already added to the phonebook`) 
      : 
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilterPersons(persons.filter((person) => (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)))
    console.log(filterPersons)
  }

  return (
    <div>
      <Heading heading='Phonebook' />

      <Filter onChange={handleFilterChange} value={filter} />

      <Heading heading='Add a new number' />

      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
    
      <Heading heading='Numbers' />

      {filter === '' ? <Persons filterPersons = {persons} /> : <Persons filterPersons = {filterPersons} /> }
    </div>
  )
}

export default App