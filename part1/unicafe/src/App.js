import React, { useState } from 'react'

const Statistics = ({good, neutral, bad, all}) => {
  if(all === 0) {
    return (
      <>
        <p> No feedback given </p>
      </>
    )
  }
  
  const average = (good - bad) / all
  const positive = good / all
  return (
    <p>
      good {good} <br />
      neutral {neutral} <br /> 
      bad {bad} <br />
      all {all} <br /> 
      average {average} <br />
      positive {positive} % <br />
    </p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const changeGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const changeNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const changeBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <>
      <h1>give feedback</h1>

      <button onClick={changeGood} > good </button>
      <button onClick={changeNeutral} > neutral </button>
      <button onClick={changeBad} > bad </button>

      <h3>statistics</h3>
      
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {good + neutral + bad} />
    </>
  )
}

export default App