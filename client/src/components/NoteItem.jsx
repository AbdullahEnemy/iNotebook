import React from "react";
import { useState, useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export const NoteItem = (props) => {
  const { note,updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote} = context;
  return (
    <>
 <div className="col-md-6 col-lg-4 my-3">
  <div className="card shadow-sm border-0 h-100 hover-shadow transition">
    <div className="card-body d-flex flex-column">
      <div className="d-flex align-items-start mb-2">
        <h5 className="card-title text-primary mb-0">{note.title}</h5>
        <div className="ms-auto">
          <i
            className="fa-solid fa-trash text-danger mx-2"
            role="button"
            title="Delete Note"
            onClick={() => deleteNote(note._id)}
          ></i>
          <i
            className="fa-solid fa-pen-to-square text-primary mx-1"
            role="button"
            title="Edit Note"
            onClick={() => updateNote(note)}
          ></i>
        </div>
      </div>
      <p className="card-text text-muted">{note.description}</p>
      {note.tag && (
        <span className="badge bg-secondary align-self-start mt-auto">
          {note.tag}
        </span>
      )}
    </div>
  </div>
</div>


    </>
  );
};
