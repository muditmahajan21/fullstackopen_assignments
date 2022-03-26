import React from 'react'

const notifStyle = {
  color: 'blue',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const Notification = ( { notificationMessage } ) => {
  if(notificationMessage === null) {
    return null
  }
  return (
    <div style={notifStyle}>
      {notificationMessage}
    </div>
  )
}

export default Notification
