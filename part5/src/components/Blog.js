import React from 'react'
const Blog = ({blog}) => (
  <div>
    <p> {blog.title} <br /> {blog.author} </p>
  </div>  
)

export default Blog