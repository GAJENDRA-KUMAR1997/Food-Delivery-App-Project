import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Model from "../Model";
import Cart from "../Screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
  const [cartView,setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 " to="/">
            FOODZONE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  fw-500 me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white mx-2 fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active text-white mx-2 fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-2 " to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-2" to="/signup">
                  Signup
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <div className="btn bg-white text-success mx-2 position-relative" onClick={()=>setCartView(true)}>
                  My Cart{data.length>0 ? <span className="badge  bg-danger position-absolute top-0 start-100 translate-middle p-2 rounded-circle">{data.length}</span> : ""}
                </div>
                {
                cartView ? <Model onClose={()=>setCartView(false)} ><Cart></Cart></Model> : ""
                }
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
