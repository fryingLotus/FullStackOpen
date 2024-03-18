import { Note } from "./types";
import { getAllNotes, createNote } from "./noteService";

import { useEffect, useState } from "react";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: "Dog" }]);
  useEffect(() => {
    getAllNotes().then((data) => {
      setNotes(data);
    });
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNote({ content: newNote }).then((data) => {
      setNotes(notes.concat(data));
    });
    const noteToAdd = {
      content: newNote,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteToAdd));
    setNewNote("");
  };

  const [newNote, setNewNote] = useState("");

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};
export default App;
