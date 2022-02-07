import React, { useState } from 'react'

const TotalStat = (props) => {
  return (
    <>
      <p> all {props.good + props.neutral + props.bad} </p>
    </>
  )
} 

const AverageStat = (props) => {
  const avg = (props.good - props.bad) / (props.good + props.neutral + props.bad)
  return (
    <>
      <p> average {avg} </p>
    </>
  )
} 

const Percentage = (props) => {
  const percent = (props.good) / (props.good + props.neutral + props.bad)
  return (
    <>
      <p> positive {percent} % </p>
    </>
  )
}

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

      <TotalStat good = {good} neutral = {neutral} bad = {bad} />
      <AverageStat good = {good} neutral = {neutral} bad = {bad} />
      <Percentage good = {good} neutral = {neutral} bad = {bad}/>
    </>
  )
}

export default App