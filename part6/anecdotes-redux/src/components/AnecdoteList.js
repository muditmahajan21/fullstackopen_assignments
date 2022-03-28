import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        const filter = state.filter
        const anecdotes = state.anecdotes
        return filter === null ? anecdotes : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote.id))
        dispatch(createNotification(`You voted for "${anecdote.content}"`))
        setTimeout(() => {
            dispatch(createNotification(null))
        }
        , 5000)
    }
    
    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => (a.votes > b.votes? -1 : 1)) && anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList