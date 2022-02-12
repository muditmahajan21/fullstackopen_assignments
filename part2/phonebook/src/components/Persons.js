import React from 'react'

import Name from './Name'

const Persons = ( {filterPersons} ) => {
    return (
      <ul>
          {filterPersons.map((filterPerson) => 
              <Name key={filterPerson.id} name={filterPerson.name} number={filterPerson.number} />
          )} 
      </ul>
    )
}
  
export default Persons