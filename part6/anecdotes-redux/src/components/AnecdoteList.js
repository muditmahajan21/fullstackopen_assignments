import React from "react" 
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        const filter = state.filter
        const anecdotes = state.anecdotes
        if (filter === '') {
            return anecdotes
        }
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(createNotification(`You voted for: ${anecdote.content}`, 5))
    }

    return (
        <div>
            {anecdotes.sort((e, f) => (e.votes > f.votes ? -1 : 1)) &&
                anecdotes.map((anecdote) => (
                    <div key = {anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>  
                        <>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>Vote</button>
                        </>
                    </div>
                ))
            }
        </div>
    )
}

export default AnecdoteList