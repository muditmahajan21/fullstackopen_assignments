import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const create = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        dispatch(addAnecdote(content));
        dispatch(createNotification(`New anecdote: "${content}"`));
        setTimeout(() => {
            dispatch(createNotification(null));
        } , 5000);
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