import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const changeGood = () => {
    setGood(good + 1)
  }

  const changeNeutral = () => {
    setNeutral(neutral + 1)
  }

  const changeBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={changeGood} > good </button>
      <button onClick={changeNeutral} > neutral </button>
      <button onClick={changeBad} > bad </button>

      <h3>statistics</h3>
      <p> good {good} </p>
      <p> neutral {neutral} </p>
      <p> bad {bad} </p>
    </>
  )
}

export default App