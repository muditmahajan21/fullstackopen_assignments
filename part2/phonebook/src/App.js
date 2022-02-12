import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
const Heading = ( {heading} ) => <h2> {heading} </h2>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()

    const personsArray = persons.map(e => e.name)

    const personObject = {
      name: newName,
      number: newNumber,
      id: personsArray.length + 1,
    }

    personsArray.includes(`${personObject.name}`) ? alert(`${newName} is already added to the phonebook`) : setPersons(persons.concat(personObject))
    setNewName('')
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