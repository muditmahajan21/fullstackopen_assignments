import React from 'react'

import personService from '../services/persons' 


const Persons = ( {filterPersons, setPersons, setErrorMessage} ) => {

    const confirmDelete = ( filterPerson ) => {

        const confirmation = window.confirm(`Delete ${filterPerson.name} ?`)
        if(confirmation) {
            personService
            .deleteObject(filterPerson.id)
            
            .then(response => {
                setPersons(filterPersons.filter(item => item !== filterPerson))
                setErrorMessage(`${filterPerson.name} was deleted`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
        }
    }

    return (
      <ul>
          {filterPersons.map((filterPerson) => 
            <ul>
                <li>{filterPerson.name}</li>
                {filterPerson.number} {" "} 
                <button onClick={() => confirmDelete(filterPerson)} > Delete </button>
                <br />
            </ul>
          )} 
      </ul>
      
    )
}
  
export default Persons