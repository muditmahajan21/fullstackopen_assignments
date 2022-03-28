import React from "react"
import { connect } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const createAnecdote = async (event) => {
        event.preventDefault()
        const data = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(data)
        props.createNotification(`You created: ${data}`, 5)
    }

    return (
        <>
            <h3> Create new ANecdote </h3>
            <form onSubmit={createAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default connect (
    null,
    { addAnecdote, createNotification }
) (AnecdoteForm)