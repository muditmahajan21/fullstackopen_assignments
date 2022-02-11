import { useState } from 'react'

const Name = ( {name} ) => <p> {name} </p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const personsArray = persons.map(e => e.name)
    const personObject = {
      name: newName,
    }
    console.log(`${personObject.name}`)
    personsArray.includes(`${personObject.name}`) ? alert(`${newName} is already added to the phonebook`) : setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange = {handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => 
            <Name key={i} name={person.name} />
        )} 
      </ul>
    </div>
  )
}

export default App