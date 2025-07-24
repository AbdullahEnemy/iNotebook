import React from "react";
import { useState, useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export const AddNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const context = useContext(noteContext);
  const { addNote } = context;
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
    title: "",
    description: "",
    tag: "",
  })
  };
  return (
    <>
      <div className="container my-5 d-flex justify-content-center">
  <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "600px" }}>
    <h2 className="text-center mb-4">📝 Add a New Note</h2>
    <form className="needs-validation" noValidate>
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-semibold">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Enter a short title"
          onChange={onChange}
          value={note.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-semibold">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          placeholder="Write something more detailed..."
          onChange={onChange}
          value={note.description}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label fw-semibold">
          Tag <span className="text-muted">(optional)</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          placeholder="e.g., Work, Personal, Idea"
          onChange={onChange}
          value={note.tag}
        />
      </div>

      <button
        disabled={note.title.length < 3 || note.description.length < 5}
        type="submit"
        className="btn btn-primary w-100"
        onClick={handleClick}
      >
        ➕ Add Note
      </button>
    </form>
  </div>
</div>

    </>
  );
};
