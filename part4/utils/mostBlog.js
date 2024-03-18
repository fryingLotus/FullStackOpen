const _ = require('lodash');

const mostBlog = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, 'author');
    const authorsWithMultipleBlogs = _.filter(blogsByAuthor, (blogs, author) => blogs.length > 1);

    if (authorsWithMultipleBlogs.length > 0) {
        const mostBlogsAuthor = _.maxBy(authorsWithMultipleBlogs, 'length');

        return {
            author: mostBlogsAuthor[0].author,
            count: mostBlogsAuthor.length,
        };
    } else {
        return {
            author: null,
            count: 0,
        };
    }
};

module.exports = mostBlog;
