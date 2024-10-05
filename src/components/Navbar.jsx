import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { useDispatch } from 'react-redux';
import { LogOut, reset } from "../features/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink to="/dashboard" className="navbar-item">
          <img src={logo} width="112" height="28" alt='logo' />
        </NavLink>

        <button 
          className="navbar-burger burger" 
          aria-label="menu" 
          aria-expanded="false" 
          data-target="navbarBasicExample"
          onClick={() => {
            const navbarMenu = document.getElementById("navbarBasicExample");
            navbarMenu.classList.toggle("is-active");
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={logout} className="button is-danger is-light">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
