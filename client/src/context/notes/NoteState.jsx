import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:3000/api/notes/";
      const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3OTU5ZjM1Y2VmN2U0Yzc2YWYwYTI5IiwiZW1haWwiOiJvd2Fpc0BnbWFpbC5jb20ifSwiaWF0IjoxNzUzMTgzODc3fQ.nLQ3cUtBP1rkthyp_GeSFIktas1LETQMSJbj0fA26ng";
  const getAllNotes = async () => {
    const response = await fetch(`${host}getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      }
    });
    const json = await response.json();
    console.log(json);
    const newNotes=json.notes;
    console.log(newNotes);
    setNotes(newNotes);
  };
  
  const [notes, setNotes] = useState([]);
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json;

    let note = {
      _id: "",
      user: "687959f35cef7e4c76af0a29",
      title: title,
      description: description,
      tag: tag,
      date: "2025-07-17T20:16:08.926Z",
      __v: 0,
    };
    console.log("adding a new note");
    setNotes(notes.concat(note));
  };
  const editNote = async (id, title, description, tag) => {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3OTU5ZjM1Y2VmN2U0Yzc2YWYwYTI5IiwiZW1haWwiOiJvd2Fpc0BnbWFpbC5jb20ifSwiaWF0IjoxNzUzMTgzODc3fQ.nLQ3cUtBP1rkthyp_GeSFIktas1LETQMSJbj0fA26ng";
    const response = await fetch(`${host}updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json;
    for (let idx = 0; idx < notes.length; idx++) {
      const element = notes[idx];
      if (element._id === id) {
        element.title = title;
        element.tag = tag;
        element.description = description;
        break;
      }
    }
  };
  const deleteNote = async (id) => {
    const response = await fetch(`${host}deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
    });
    const json = await response.json;
    console.log(id);
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  return (
    <noteContext.Provider
      value={{ notes, setNotes, deleteNote, addNote, editNote,getAllNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
