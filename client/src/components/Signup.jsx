import React from 'react'

export const Signup = () => {
     const [credentials, setCredentials] = useState({name:"", email: "", password: "" });
    const handleSubmit=async()=>{
        
    }
    const onCHange=()=>{
        setCredentials({...credentials,[e.target.name]: e.target.value })
    }
  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}>
                <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            
            onChange={onChange}
            value={credentials.email}
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
      </div>
    </>
    
  )
}
