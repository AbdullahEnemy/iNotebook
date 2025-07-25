import React from "react";
import noteContext from "./noteContext";
import { useState,useContext } from "react";
import alertContext from "../alert/alertContext";
const NoteState = (props) => {
    const context = useContext(alertContext);
    const { showAlert } = context;
  const host = "http://localhost:3000/api/notes/";
  
  const getAllNotes = async () => {
    try {
      const authToken =localStorage.getItem("authToken")
      const response = await fetch(`${host}getallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken,
        },
      });
      const json = await response.json();
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
      const authToken =localStorage.getItem("authToken")
      const response = await fetch(`${host}addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      if (json.success) {
        setNotes(notes.concat(json.savedNotes));
        showAlert(json.message,"success");
      }
        else{
    showAlert(json.message, "danger");
    }

      
    } catch (err) {
      console.log(err);
    }
  };
  const editNote = async (id, title, description, tag) => {
    try {
      const authToken =localStorage.getItem("authToken")
       const response = await fetch(`${host}updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
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
    if (json.success) {
    console.log(newNote);
    setNotes(newNote);
    showAlert(json.message,"success");
    }
    else{
    showAlert(json.message, "danger");
    }

    } catch (err) {
        console.log(err)
    }

  };
  const deleteNote = async (id) => {
    try {
      const authToken =localStorage.getItem("authToken")
      const response = await fetch(`${host}deletenotes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken,
        },
      });
      const json = await response.json();
      //console.log(json);
      console.log(json.success);
      if (json.success) {
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      showAlert(json.message,"success");
      }
      else{
         showAlert(json.message, "danger");
      }

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
