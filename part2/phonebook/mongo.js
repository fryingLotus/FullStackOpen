import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Usage:");
  console.log("To store data: node mongo.js <password> <name> <number>");
  console.log("To display data: node mongo.js <password>");
  process.exit(1);
}

const [, , password, ...args] = process.argv;

const dbName = "phonebook";
const url = `mongodb+srv://blightningboltz5:${password}@cluster0.tcbyrna.mongodb.net/${dbName}`;

mongoose.set("strictQuery", false);

const savePerson = async (name, number) => {
  try {
    await mongoose.connect(url);

    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    });

    const Person = mongoose.model("Person", personSchema);

    const person = new Person({
      name,
      number,
    });

    const result = await person.save();
    console.log(`Added ${result.name} with number ${result.number} to the phonebook`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
};

const displayPersons = async () => {
  try {
    await mongoose.connect(url);

    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    });

    const Person = mongoose.model("Person", personSchema);

    const persons = await Person.find({});
    console.log('phonebook');
    persons.forEach((person) => {
      console.log(person.name,person.number);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
};

if (args.length === 2) {
  const [name, number] = args;
  savePerson(name, number);
} else if (args.length === 0) {
  displayPersons();
} else {
  console.log("Invalid arguments. Please provide either <password> or <password> <name> <number>");
  process.exit(1);
}
