import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    //console.log(json);
    if (!json.success) {
      alert("Data is incorrect");
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
    }
  };
  const onchangeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const myStyle = {
    maxWidth:"400px",
    height:"500px",
    paddingTop:"20px",
    backgroundImage:"url('https://img.freepik.com/premium-vector/network-connection-background-abstract-style_23-2148875738.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715385600&semt=ais_user')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
   
  } 
  const style1 = {
    display:"flex",
    justifyContent:"center",
    alignItems : "center",
    backgroundImage:"url('https://static1.squarespace.com/static/5b1590a93c3a53e49c6d280d/5b16e4e3562fa7121fbe3fc3/6103106779f0ea7e7006c209/1692119314357/GFO+-+Banner.jpg?format=1500w')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height:"100vh"
  }
  return (
    <div style={style1}>
      <div className="container border border-primary rounded" style={myStyle}>
        
        <form onSubmit={handleSubmit} style={{marginTop:"80px"}}>
          <h1 className="text text-white">Login Customers</h1>
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
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </div>
  );
}
