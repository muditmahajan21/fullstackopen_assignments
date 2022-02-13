import React from 'react'

import personService from '../services/persons'
 
const Persons = ( {filterPersons, setPersons} ) => {

    const confirmDelete = ( filterPerson ) => {

        const confirmation = window.confirm(`Delete ${filterPerson.name} ?`)
        if(confirmation) {
            personService
            .deleteObject(filterPerson.id)
            setPersons(filterPersons.filter(item => item !== filterPerson))
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