import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogForm = ({onSubmit, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange}) =>
  
  <form onSubmit={onSubmit}>
        <div>
            Title: <input value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
            Author: <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
            Url: <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
            <button type="submit">create</button>
        </div>
    </form>

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')      
      setTimeout(() => {
        setErrorMessage(null)      
      }, 5000)
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      console.log('logout failed')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      url: newBlogUrl,
      author: newBlogAuthor,
    }

    try {
      await blogService.create(blogObject)
      setNewBlogTitle('')
      setNewBlogUrl('')
      setNewBlogAuthor('')
      
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      console.log('Cannot add new blog')
    }
  }

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const allBlogs = () => (
    <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )

  return (
    <div>
      
      <h2>blogs</h2>
      
      {user === null ?
        loginForm() :
        <div>
          <p> {user.name} logged in </p> 
          <button onClick={handleLogout}>logout</button>
          <h2> Create a new Blog </h2>
          <BlogForm onSubmit={addBlog} newTitle = {newBlogTitle} handleTitleChange = {handleTitleChange} newAuthor = {newBlogAuthor} handleAuthorChange = {handleAuthorChange} newUrl = {newBlogUrl}  handleUrlChange = {handleUrlChange} />
          {allBlogs()}  
        </div>
      }
    </div>
  )
}

export default App