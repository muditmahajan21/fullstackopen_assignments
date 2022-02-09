import React, { useState } from 'react'

const Heading = ( props ) =>  <h1> {props.text} </h1>

const Button = ( {handleclick, text} ) => {
  return (
    <button onClick={handleclick}> {text} </button>
  )
}

const MaxAnecdote = ( {anecdotes, votes} ) => {
  let maxCount = 0
  let maxCountIndex = 0
  for (const [index, voteCount] of Object.entries(votes)){
    if(voteCount > maxCount) {
      maxCount = voteCount
      maxCountIndex = index
    }
  }

  const maxAnecdote = anecdotes[maxCountIndex]

  if(maxCount === 0) {
    return (
      <p> No votes yet! </p>
    )
  }

  return (
    <>
      <p> {maxAnecdote} </p>
      <p> has {maxCount} votes </p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleRandomSelection = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    const copy_votes = {...votes}
    copy_votes[selected] += 1
    setVotes(copy_votes)
  }

  return (
    <div>
      <Heading text='Anecdote of the day'/>
      
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes </p>
      
      <Button handleclick={handleVote} text="vote" />
      <Button handleclick={handleRandomSelection} text='next anecdote' />

      <Heading text='Anecdote with most votes' />
      <MaxAnecdote anecdotes = {anecdotes} votes = {votes} />
    </div>
  )
}

export default App 