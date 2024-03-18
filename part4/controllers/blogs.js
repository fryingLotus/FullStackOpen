const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { getTokenFrom } = require("../utils/middleware");
blogsRouter.use(getTokenFrom);

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
  response.json(blog)
  } else {
  response.status(404).end()
  }
})


blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = request.decodedToken; // Fix here

  try {
    if (!decodedToken) {
      return response.status(401).json({ error: "Token verification failed" });
    }

    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: "Token invalid: Missing user ID" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    console.error("Token Verification Error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});


blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = request.decodedToken;

    if (!decodedToken) {
      return response.status(401).json({ error: "Token verification failed" });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (decodedToken.id.toString() !== blog.user.toString()) {
      return response
        .status(403)
        .json({ error: "Unauthorized: You can only delete your own blogs" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
