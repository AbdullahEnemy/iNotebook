import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

export const Login = () => {
    const context=useContext(alertContext);
    const{showAlert}=context;
    const baseUrl="http://localhost:3000/api/auth/loginUser";
    const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({ email:credentials.email, password:credentials.password }),
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
        <h2 className="text-center my-4 ">Login to Continue</h2>
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      </div>
    </>
  );
};
