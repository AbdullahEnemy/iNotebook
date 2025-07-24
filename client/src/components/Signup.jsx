import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

export const Signup = () => {
  const context = useContext(alertContext);
  const { showAlert } = context;
  const baseUrl = "http://localhost:3000/api/auth/createUser";
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("authToken", json.Token);
        showAlert(json.message, "success");
        navigate("/");
        console.log(json.message);
      } else {
        showAlert(json.message, "danger");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-80">
  <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
    <h2 className="text-center mb-4 text-primary">
      <i className=" me-2"></i>Sign Up to Continue
    </h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-semibold">
          <i className="fa-solid fa-user me-1"></i> Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          onChange={onChange}
          value={credentials.name}
          minLength={5}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-semibold">
          <i className="fa-solid fa-envelope me-1"></i> Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={onChange}
          value={credentials.email}
          required
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-semibold">
          <i className="fa-solid fa-lock me-1"></i> Password
        </label>
        <input
          type="password"
          value={credentials.password}
          className="form-control"
          id="password"
          name="password"
          onChange={onChange}
          minLength={8}
          required
          placeholder="Create a strong password"
        />
      </div>

      <div className="d-grid">
        <button
          disabled={credentials.name.length < 5 || credentials.password.length < 8}
          type="submit"
          className="btn btn-primary fw-semibold"
        >
          <i className="fa-solid fa-user-check me-1"></i> Sign Up
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  );
};
