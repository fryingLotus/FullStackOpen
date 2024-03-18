const logger = require('./logger')
const jwt = require("jsonwebtoken");

// utils/middleware.js

const getTokenFrom = (request, response, next) => {
  const authorization = request.get("authorization");
  
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      // Attach the decoded token to the request
      request.decodedToken = decodedToken;
    } catch (error) {
      console.error('Token Verification Error:', error.message);
      request.decodedToken = null;
    }
  } else {
    request.decodedToken = null;
  }
  
  console.log('Decoded Token:', request.decodedToken); // Add this line for debugging
  next();
};

// ... rest of your middleware code


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })

  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  getTokenFrom,
  requestLogger,
  unknownEndpoint,
  errorHandler
}