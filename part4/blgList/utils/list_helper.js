const _ = require('lodash')

const totalLikes = (blogs) => {
    if(blogs.length === 0) 
        return 0
    
    if(blogs.length === 1) 
        return blogs[0].likes
    
    const total = blogs.reduce((tot, blog) => tot + blog.likes, 0)
    return total
}

const favouriteBlog = (blogs) => {
    if(blogs.length === 0) 
        return {}
    const favourite = blogs.reduce((prevBlog, currBlog) =>
        currBlog.likes < prevBlog.likes ? prevBlog : currBlog
    )
    return {
        title: favourite.title,
        author: favourite.author,
        likes: favourite.likes,
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) 
        return {}
    
    const blogsByAuthor = _.toArray(_.groupBy(blogs, (blog) => blog.author))
    const authorMostBlogs = _.maxBy(blogsByAuthor, (blogsList) => blogsList.length)
    return {
        author: authorMostBlogs[0].author,
        blogs: authorMostBlogs.length,
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) 
        return {}
    
    const blogsByAuthor = _.toArray(_.groupBy(blogs, (blog) => blog.author))
    const blogsByLikes = _.mapValues(blogsByAuthor, totalLikes)
    const mostLikedAuthor = Object.entries(blogsByLikes).reduce((a, b) => a[1] > b[1] ? a : b)
    console.log(mostLikedAuthor)
    return {
        author: blogs[mostLikedAuthor[0]].author,
        likes: mostLikedAuthor[1],
    }
}

module.exports = {
    totalLikes, favouriteBlog, mostBlogs, mostLikes
}

