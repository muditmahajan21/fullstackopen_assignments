import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [notificationMessage, setNotificationMessage] = useState(null)
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
      setNotificationMessage(`${user.name} logged in`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage('Wrong credentials')      
      setTimeout(() => {
        setNotificationMessage(null)      
      }, 5000)
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setNotificationMessage('Logged out')
      setTimeout(() => {
        setNotificationMessage(null)
      } , 5000)
    } catch (exception) {
      setNotificationMessage('Logout failed')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
      setNotificationMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      } , 5000)
    } catch (exception) {
      setNotificationMessage('Blog creation failed')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

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
      <Notification notificationMessage = {notificationMessage} />
      {user === null ?
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          handleUsernameChange={handleUsernameChange} 
          password={password} 
          handlePasswordChange={handlePasswordChange} 
        />:
        <div>
          <p> {user.name} logged in </p> 
          <button onClick={handleLogout}>logout</button>
          <h2> Create a new Blog </h2>
          <BlogForm 
            onSubmit={addBlog} 
            newTitle = {newBlogTitle} 
            handleTitleChange = {handleTitleChange} 
            newAuthor = {newBlogAuthor} 
            handleAuthorChange = {handleAuthorChange} 
            newUrl = {newBlogUrl}  
            handleUrlChange = {handleUrlChange} 
          />
          {allBlogs()}  
        </div>
      }
    </div>
  )
}

export default App