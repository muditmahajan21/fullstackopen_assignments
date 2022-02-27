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

module.exports = {
    totalLikes, favouriteBlog
}

