import React from "react"
import { connect } from "react-redux"

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

const stateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(stateToProps)(Notification)