import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

export const Signup = () => {
        const context=useContext(alertContext);
        const{showAlert}=context;
    const baseUrl="http://localhost:3000/api/auth/createUser";
    const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
     try{const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:credentials.name,email:credentials.email, password:credentials.password }),
    });
    const json = await response.json();
    if(json.success){
        localStorage.setItem("authToken",json.Token)
         showAlert(json.message,"success")
        navigate("/");
        console.log(json.message);
    }else{
         showAlert(json.message,"danger")
    }}catch(err){
        console.log(err);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
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
              placeholder="Enter your Name (min 5 characters)."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={credentials.email}
               placeholder="Enter your email."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
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
              placeholder="Enter Password (min 8 characters)."
            />
          </div>
          <button
            disabled={credentials.name < 5 || credentials.password < 8}
            type="submit"
            className="btn btn-primary"
          >
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};
