import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      url: newBlogUrl,
      author: newBlogAuthor,
    })

    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog} id = "form" >
        <div>
                    Title: <input id = "title" value={newBlogTitle} onChange={handleTitleChange} />
        </div>
        <div>
                    Author: <input id = "author" value={newBlogAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
                    Url: <input id = "url" value={newBlogUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm