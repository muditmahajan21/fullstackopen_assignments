import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const create = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        dispatch(addAnecdote(content));
    }

    return (
        <>
            <h2>Create new Form</h2>
            <form onSubmit={create}>
                <div>
                    <input name="anecdote" />
                </div>
                <button tyoe="submit" >create</button>
            </form>
        </>
    )
}

export default AnecdoteForm 