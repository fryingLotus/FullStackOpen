
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const jwt = require("jsonwebtoken");
const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (parent, args) => {
        try {
          let query = {};
  
          if (args.author && args.genre) {
            query = { author: args.author, genres: { $in: [args.genre] } };
          } else if (args.author) {
            query = { author: args.author };
          } else if (args.genre) {
            query = { genres: { $in: [args.genre] } };
          }
  
          const books = await Book.find(query).populate('author');
          return books;
        } catch (error) {
          console.error('Error fetching books:', error);
          throw new Error('Failed to fetch books: ' + error.message);
        }
      },
      me: (root, args, context) => {
        return context.currentUser
      },
      allAuthors: async() => {
        try {
          const authors = await Author.find();
          return authors
        } catch (error) {
          console.error('Error fetching authors:', error);
         
          throw new GraphQLError('Failed to fetch author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      },
    },
    Mutation: {
      addBook: async (parent, args, context) => {
        try {
          // Extract the user from the context
          const currentUser = context.currentUser;
      
          // Check if the user is authenticated
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
      
          // Find or create the author
          let author;
          if (args.author) {
            author = await Author.findOne({ name: args.name });
            if (!author) {
              author = new Author({ name: args.author });
              await author.save();
            }
          }
      
          // Create the book
          const book = new Book({
            title: args.title,
            published: args.published,
            genres: args.genres,
            author: author ? author._id : null, 
          });
      
          await book.save();
      
          // Publish the event to the subscription channel
          pubsub.publish('BOOK_ADDED', { bookAdded: book });
      
          return book;
        } catch (error) {
          console.error('Error adding book:', error);
          throw new GraphQLError('Failed to add book', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      },
      
      editAuthor: async (parent, args,context) => {
        try {
          const currentUser = context.currentUser;
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
          const author = await Author.findOne({ name: args.name });
          if (!author) {
            throw new GraphQLError('Author not found', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
              },
            });
          }
          author.born = args.setBornTo;
          await author.save();
          return author;
        } catch (error) {
          throw new GraphQLError('Editing author failed', {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
              invalidArgs: args.name,
              error,
            },
          });
        }
      },
        createUser: async (root, args) => {
          try {
            const user = new User({ username: args.username,favoriteGenre: args.favoriteGenre });
            return await user.save();
          } catch (error) {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error: error.message,
              },
            });
          }
        },
        login: async (root, args) => {
          const user = await User.findOne({ username: args.username })
      
          if ( !user || args.password !== 'secret' ) {
            throw new GraphQLError('wrong credentials', {
              extensions: { code: 'BAD_USER_INPUT' }
            })        
          }
      
          const userForToken = {
            username: user.username,
            id: user._id,
          }
      
          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
      },
      Book: {
        author: async (parent) => {
          try {
            return await Author.findById(parent.author);
          } catch (error) {
            console.error('Error fetching author:', error);
            throw new Error('Failed to fetch author: ' + error.message);
          }
        },
      },
      Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
      },
      

  }
  module.exports = resolvers;