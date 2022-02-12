import React from 'react' 

const Filter = ( {onChange, value} ) => {
    return (
      <>
        filter shown with <input value = {value} onChange = {onChange} /> 
      </>
    )
}

  export default Filter