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
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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

  const addBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogFormVisible(false)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setNotificationMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
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

  const loginform = () => {
    const hideWhenVisible = {display: loginVisible ? 'none' : ''}
    const showWhenVisible = {display: loginVisible ? '' : 'none'}
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          handleUsernameChange={handleUsernameChange} 
          password={password} 
          handlePasswordChange={handlePasswordChange} 
        />
        <button onClick={() => setLoginVisible(false)}> Cancel </button>
        </div>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = {display: blogFormVisible ? 'none' : ''}
    const showWhenVisible = {display: blogFormVisible ? '' : 'none'}
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Add new blog</button>
        </div>
        <div style={showWhenVisible}>
        <h2> Create a new Blog </h2>
        <BlogForm createBlog={addBlog}/>
          <button onClick={() => setBlogFormVisible(false)}> Cancel </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notificationMessage = {notificationMessage} />
      {user === null ?
        <div>
          {loginform()}
        </div>
        :
        <div>
          <p> {user.name} logged in </p> 
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {allBlogs()}  
        </div>
      }
    </div>
  )
}

export default App