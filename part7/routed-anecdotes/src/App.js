import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useNavigate
} from "react-router-dom"

import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const CreateNew = (props) => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    setContent('')
    setAuthor('')
    setInfo('')
    navigate('/anecdotes')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)

  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Notification notification={notification} />
      <Router>
        <div>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/anecdotes">Anecdotes</Link>
          <Link style={padding} to="/about">About</Link>
          <Link style={padding} to="/create">Create New</Link>
        </div>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateNew addNew = {addNew}/>} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
