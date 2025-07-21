import React from "react";

export const NoteItem = (props) => {
  const { note } = props;
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <div className="ms-auto">
                <i className="fa-solid fa-trash mx-1"></i>
                <i className="fa-solid fa-pen-to-square mx-1"></i>
              </div>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};
