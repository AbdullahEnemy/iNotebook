import React from "react";
import { useContext ,useEffect} from 'react';
import noteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";
import { AddNote } from "./AddNote";
export const Notes = () => {
      const context=useContext(noteContext);
      const {notes,setNotes,addNote,getAllNotes}=context;
      useEffect(()=>{
        getAllNotes();
      },[])
  return (
    <>
    <AddNote></AddNote>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
            return <NoteItem key={note._id} note={note} />;;
        })}
      </div>
    </>
  );
};
