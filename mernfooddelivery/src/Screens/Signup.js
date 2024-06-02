import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
        alert("Data is incorrect");
    }
  };
  const onchangeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const style1 = {
     display:"flex",
    justifyContent:"center",
    alignItems : "center",
    backgroundImage:"url('https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height:"100vh"
  }
  const myStyle = {
    width:"500px",
    height:"600px",
    paddingTop:"30px",
    background: "radialGradient(circle, rgba(238,174,202,1) 0%, rgba(33,115,213,1) 100%)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }
  return (
    <div style={style1}>
      <div className="container border border-white" style={myStyle}>
        <form onSubmit={handleSubmit}>
          <h1 className="text text-white">Sign Up New Customers</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onchangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-white">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onchangeHandler}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-white">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onchangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label text-white">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={credentials.location}
              onChange={onchangeHandler}
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
}
