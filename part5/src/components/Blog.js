import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {

  const [blogVisibility, setBlogVisibility] = React.useState(false)
  const [blogObject, setBlogObject] = React.useState(blog)
  const showWhenVisible = { display: blogVisibility ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisibility(!blogVisibility)
  }

  const buttonLabel = blogVisibility ? 'hide' : 'view'

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blogObject.likes + 1
    }
    updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const removeBlog = () => deleteBlog(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <p> {blog.title} - {blog.author} <button onClick={toggleVisibility}> {buttonLabel} </button> </p>
      <div style={showWhenVisible}>
        <p> {blog.url} </p>
        <p> Likes : {blogObject.likes} <button onClick={increaseLikes}> like </button> </p>
        <button onClick={removeBlog} > Delete </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog