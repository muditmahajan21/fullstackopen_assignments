import React, { useState } from 'react'

const Button = ({handleOnClick, text}) => {
  return (
    <>
      <button onClick={handleOnClick} > {text} </button>
    </>
  )
}

const StasticLine = ({feedback, stat}) => {
  return (
    <>
      <td>{feedback} {stat}</td>
    </>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if(all === 0) {
    return (
      <>
        <p> No feedback given </p>
      </>
    )
  }
  
  const average = (good - bad) / all
  const positive = ((good / all) * 100) + '%'
  return (
    <table>
      <tbody>
        <tr><StasticLine feedback='good' stat={good} /></tr>
        <tr><StasticLine feedback='neutral' stat={neutral} /></tr>
        <tr><StasticLine feedback='bad' stat={bad} /></tr>
        <tr><StasticLine feedback='all' stat={all} /></tr>
        <tr><StasticLine feedback='average' stat={average} /></tr> 
        <tr><StasticLine feedback='positive' stat={positive} /></tr>
      </tbody>
    </table>
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
      <Button handleOnClick={changeGood} text='good' />
      <Button handleOnClick={changeNeutral} text='neutral' />
      <Button handleOnClick={changeBad} text='bad' />

      <h3>statistics</h3>
      
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {good + neutral + bad} />
    </>
  )
}

export default App