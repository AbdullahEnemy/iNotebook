import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:3000/api/notes/";
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3OTU5ZjM1Y2VmN2U0Yzc2YWYwYTI5IiwiZW1haWwiOiJvd2Fpc0BnbWFpbC5jb20ifSwiaWF0IjoxNzUzMTgzODc3fQ.nLQ3cUtBP1rkthyp_GeSFIktas1LETQMSJbj0fA26ng";
  const getAllNotes = async () => {
    try {
      const response = await fetch(`${host}getallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      console.log(json);
      const newNotes = json.notes;
      setNotes(newNotes);
    } catch (err) {
      console.log(err);
    }
  };

  const [notes, setNotes] = useState([]);
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      setNotes(notes.concat(json.savedNotes));
    } catch (err) {
      console.log(err);
    }
  };
  const editNote = async (id, title, description, tag) => {
    try {
            const response = await fetch(`${host}updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    console.log(json);
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let idx = 0; idx < newNote.length; idx++) {
      const element = newNote[idx];
      if (element._id === id) {
        newNote[idx].title = title;
        newNote[idx].tag = tag;
        newNote[idx].description = description;
        break;
      }
    }
    console.log(newNote);
    setNotes(newNote);
    } catch (err) {
        console.log(err)
    }

  };
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}deletenotes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      console.log(json);
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <noteContext.Provider
      value={{ notes, setNotes, deleteNote, addNote, editNote, getAllNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
