import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/userActions'
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <nav
      className="navbar navbar-expand-md sticky-top navbar-shrink py-3"
      id="mainNav"
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <span>InternProject</span>
        </a>
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-1"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="index.html">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="services.html">
                Find Events
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create Events
              </Link>
            </li>
          </ul>
          {userInfo ? (
            <div>{userInfo.username}
            <Link
                className="btn btn-primary shadow"
                role="button"
                to="/login"
                style={{marginLeft:'20px'}}
                onClick={logoutHandler}
              >
                Logout
              </Link></div>
          ) : (
            <div>
              <a
                className="btn btn-primary shadow"
                role="button"
                href="signup.html"
              >
                Sign in
              </a>
              <a
                className="btn btn-primary shadow"
                role="button"
                href="signup.html"
                style={{marginLeft:'20px'}}
              >
                Sign up
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
