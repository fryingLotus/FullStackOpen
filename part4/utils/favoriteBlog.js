const favoriteBlog = (blogs) => {
    return blogs.reduce((maxBlog, currentBlog) => {
      return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog;
    }, blogs[0]);
  };
  
  module.exports = favoriteBlog;
  