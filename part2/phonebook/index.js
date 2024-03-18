import express, { json, static } from "express";
const app = express();
import cors from "cors";
require("dotenv").config();

import Person, { find, findOne, findById, findByIdAndUpdate, findOneAndDelete } from "./models/person";

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.get("/", (request, response) => {
  response.send("<h1>Welcome to the API</h1>");
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(json());
app.use(requestLogger);
app.use(static("dist"));

app.get("/api/persons", async (request, response) => {
  try {
    const persons = await find({});
    response.json(persons);
  } catch (error) {
    response
      .status(500)
      .json({ error: "An error occurred while fetching persons" });
  }
});

app.post("/api/persons", async (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name  missing" });
  }
  try {
    const personName = request.body.name;
    const existingPerson = await findOne({ name: personName });
    if (existingPerson) {
      existingPerson.number = body.number;
      const updatedPerson = await existingPerson.save();
      return response.json
    }

  const person = new Person({
    name: body.name,
    number: body.number,
  });


    const savedPerson = await person.save();
    response.json(savedPerson);
  } catch (error) {
    response
      .status(500)
      .json({ error: "An error occurred while saving the person" });
  }
});

app.get("/api/persons/:id", async (request, response, next) => {
  try {
    const person = await findById(request.params.id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response
      .status(500)
      .json({ error: "An error occurred while fetching the note" });
    next(error);
  }
});

// put
app.put("/api/persons/:id", async (request, response, next) => {
  try {
    const body = request.body;

    const person = {
      name: body.name,
      number: body.number,
    };
    const updatedPerson = await findByIdAndUpdate(
      request.params.id,
      person,
      { new: true }
    );
    if (updatedPerson) {
      response.json(updatedPerson);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "An error occurred while updating the person" });
    next(error); // Pass the error to the error handling middleware
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    const deletedPerson = await findOneAndDelete({
      _id: request.params.id,
    });
    if (deletedPerson) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ error: "An error occurred while deleting the person" });
    next(error);
  }
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
