import React, { useState, useEffect, useContext } from "react";
import alertContext from "../context/alert/alertContext";

export const ProfileModal = ({ show, handleClose }) => {
  const baseUrl = "http://localhost:3000/api/auth/getuser";
  const context = useContext(alertContext);
  const { showAlert } = context;

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authToken": token,
          },
        });
        const json = await response.json();


        if (json.success) {
          setUser({ name: json.name, email: json.email });
        } else {
          showAlert(json.message || "Unable to fetch user", "danger");
        }
      }
    } catch (err) {
      console.error(err);
      showAlert("Server error while fetching user", "danger");
    }
  };

  useEffect(() => {
    if (show) {
      fetchUser();
    }
  }, [show]);

  return (
    <>
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">User Profile</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
