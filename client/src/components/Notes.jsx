import React from "react";
import { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";
import { AddNote } from "./AddNote";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
// The useRef Hook allows you to persist values between renders.
// It can be used to store a mutable value that does not cause a re-render when updated.
// It can be used to access a DOM element directly.
export const Notes = () => {
    const refClose=useRef(null);
      const ref = useRef(null);
      const navigate = useNavigate();
          const contextAlert=useContext(alertContext);
          const{showAlert}=contextAlert;
  const context = useContext(noteContext);
  const { notes, getAllNotes,editNote } = context;
    const [note, setNote] = useState({
        id:"",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  
  useEffect(() => {
    try {
  if (localStorage.getItem("authToken")) {
    getAllNotes();
  } else {
    showAlert("Please login to continue", "danger");
    navigate("/login");
  }
    } catch (err) {
      console.log(err);
    }
  }, []);
    const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    try{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    }catch(err){
        console.log(err)
    }
  };

  const updateNote = (currNote) => {
    ref.current.click();
    setNote({id:currNote._id,etitle:currNote.title,edescription:currNote.description,etag:currNote.tag})
  };
  return (
    <>
      <AddNote></AddNote>
      <button
        type="button"
        className="btn btn-primary d-none" 
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        tabIndex="-1"
        
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.etitle}
            
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              onChange={onChange}
              value={note.edescription}
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              onChange={onChange}
              value={note.etag}
            />
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button  disabled={note.etitle.length<3 || note.edescription.length<5 } type="button" className="btn btn-primary" onClick={handleClick}>
                Edit Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note, idx) => {
          return (
            <NoteItem
              key={note._id || idx}
              note={note}
              updateNote={updateNote}
            />
          );
        })}
      </div>
    </>
  );
};
