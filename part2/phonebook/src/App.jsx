import React, { useState, useEffect } from "react";
import Filter from "./Component/Filter";
import PersonForm from "./Component/PersonForm";
import Persons from "./Component/Persons";
import Service from "./Component/Service";
import Notification from "./Component/Notification";
console.log("Test");
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null);
  const [correctMessage,setCorrectMessage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Service.getAllPersons();
        setPersons(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (event) => {
    setNewName({ ...newName, name: event.target.value });
  };

  const handlePhoneChange = (event) => {
    setNewName({ ...newName, number: event.target.value });
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const personExist = persons.some(
      (person) =>
        person.name === newName.name && person.number === newName.number
    );
    if (personExist) {
      setErrorMessage(
        `${newName.name} with phone number ${newName.number} is already added to the phonebook`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return;
    }
    	
    try {
      const createdPerson = await Service.createPerson(newName);
      setPersons([...persons, createdPerson]);
      setCorrectMessage(`Added ${newName.name}`)
      setTimeout(() => {
        setCorrectMessage(null);
      }, 3000);
      setFilteredUsers([...persons, createdPerson]);
      setNewName({ name: "", number: "" });
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchItem(searchTerm);
    const filteredItems = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filteredItems);
  };

  const deleteContactOf = async (person) => {
    console.log(person);
    console.log("delete contact " + person.id + " ????");

    if (window.confirm("Do you really want to delete this person")) {
      try {
        await Service.handleDelete(person.id);
        // once delete, i updated the state of all person and filtered users
        const updatedPersons = persons.filter((p) => p.id !== person.id);
        const updatedFilteredUsers = filteredUsers.filter(  
          (p) => p.id !== person.id
        );

        setPersons(updatedPersons);
        setFilteredUsers(updatedFilteredUsers);
        console.log("Person ID",person.id);
        console.log("Updated Filtered Users:",updatedFilteredUsers);
        console.log("updatedPerson:",updatedPersons);
        setErrorMessage(
          `${person.name} is deleted`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } catch (error) {
        console.error("Error Deleting Person", Error);
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <h1>
        Phonebook
      </h1>
      <Notification message={errorMessage} messageCorrect={correctMessage}/>
      <Filter searchItem={searchItem} handleInputChange={handleInputChange} />
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        filteredUsers={filteredUsers}
        deleteContactOf={deleteContactOf}
      />
      <p>Debug</p>
    </div>
  );
};

export default App;
