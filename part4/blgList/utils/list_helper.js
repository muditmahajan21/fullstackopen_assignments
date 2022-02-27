const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(!Array.isArray(blogs))
        return 0

    if(blogs.length === 0) 
        return 0
    
    if(blogs.length === 1) 
        return blogs[0].likes
    
    const total = blogs.reduce((tot, blog) => tot + blog.likes, 0)
    return total
}

module.exports = {
    dummy, totalLikes
}

