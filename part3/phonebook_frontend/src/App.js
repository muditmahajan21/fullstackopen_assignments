import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

import personService from './services/persons'

const Heading = ( {heading} ) => <h2> {heading} </h2>

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)

  const [changeMessage, setChangeMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
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
    
    const alreadyPresent = personsArray.includes(`${personObject.name}`)

    if(alreadyPresent) {
      const alreadyPresentPerson = persons.filter(person => person.name === newName)
      const alreadyPresentId = alreadyPresentPerson.map(person => person.id)[0]

      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )

      if(confirmUpdate) {
        personService
        .update(alreadyPresentId, personObject)
        .then(returnedPerson => {
          const updatedPersons = persons.map(person => 
            person.id !== returnedPerson.id ? person : returnedPerson
            )
            setPersons(updatedPersons)
            setChangeMessage(`Edited ${personObject.name}`)
            setTimeout(() => {
              setChangeMessage(null)
            }, 5000)
        })        
        .catch(err => {
          console.error(err)
          setErrorMessage(err.response.data.error)
          setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(e => e.id !== alreadyPresentId))
      })
      }
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setChangeMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setChangeMessage(null)
        }, 5000)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
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
      <Notification message={changeMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter onChange={handleFilterChange} value={filter} />

      <Heading heading='Add a new number' />

      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
    
      <Heading heading='Numbers' />

      {filter === '' ? <Persons filterPersons = {persons} setPersons={setPersons} setErrorMessage = {setErrorMessage} /> : <Persons filterPersons = {filterPersons} setPersons={setPersons} setErrorMessage={setErrorMessage} /> }
    </div>
  )
}

export default App