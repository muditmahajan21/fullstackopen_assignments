import React from "react"

const Notification = (props) => {
    const notification = props.notification
    const style = {
      border: 'solid',
      borderWidth: '1px',
      borderColor: 'lightgrey',
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: 'lightgrey',
    }
  
    if(notification === null) {
      return null
    }
  
    return (
      <div style={style}>
        {notification}
      </div>
    )
}

export default Notification