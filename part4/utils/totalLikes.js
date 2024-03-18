const totalLikes = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0].likes
  }
  return blogs.reduce((total, blog) => total + blog.likes, 0);
}

module.exports = totalLikes