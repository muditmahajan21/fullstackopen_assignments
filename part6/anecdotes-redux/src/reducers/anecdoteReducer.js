import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_ANECDOTES':
      return action.data
    case 'CREATE_NEW':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const voted = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(a => a.id === id ? voted : a)
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_NEW',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote(
      {...anecdote, votes: anecdote.votes + 1}
    )
    dispatch({
      type: 'VOTE',
      data: anecdote,
    })
  }
}

export default anecdoteReducer
