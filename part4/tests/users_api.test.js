// tests/user_api.test.js
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); // Import your Express app instance

const api = supertest(app);

describe('User API tests', () => {
  // Clear the test database before each test
  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  test('creating a new user succeeds with valid data', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword',
    };

    const response = await api.post('/api/users').send(newUser).expect(201);
    expect(response.body.username).toBe(newUser.username);
  });

  test('creating a new user fails with invalid data', async () => {
    const newUser = {
      // Missing required fields
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toContain('required');
  });

  test('creating a new user fails if username is not unique', async () => {
    const existingUser = {
      username: 'existinguser',
      name: 'Existing User',
      password: 'existingpassword',
    };

    await api.post('/api/users').send(existingUser);

    const newUserWithDuplicateUsername = {
      username: existingUser.username,
      name: 'Another User',
      password: 'anotherpassword',
    };

    const response = await api.post('/api/users').send(newUserWithDuplicateUsername).expect(400);
    expect(response.body.error).toContain('unique');
  });

  // Add more tests for validating password length, etc.
});
